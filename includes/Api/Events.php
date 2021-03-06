<?php

namespace CReP\Api;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Events extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        global $wpdb;
        $this->namespace = 'crep/v1';
        $this->rest_base = 'events';
        $this->prefix = $wpdb->prefix . 'crep_';
    }

    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_events'),
                    'permission_callback' => array($this, 'check_admin'),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array($this, 'delete_events'),
                    'permission_callback' => array($this, 'check_admin'),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array($this, 'create_event'),
                    'permission_callback' => array($this, 'check_admin'),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_event'),
                    'permission_callback' => array($this, 'check_frontend'),
                    'args' => [
                        'id'
                    ]
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array($this, 'update_event'),
                    'permission_callback' => array($this, 'check_admin'),
                    'args' => [
                        'id'
                    ]
                )
            )
        );
    }

    /**
     * Retrieves a collection of events.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_events()
    {
        global $wpdb;

        $query = "SELECT * FROM `{$this->prefix}events`";
        $list = $wpdb->get_results($query);

        return rest_ensure_response($list);
    }

    /**
     * Deletes a collection of events.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_events($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["ids"]) {
            $ids = implode(',', array_map('intval', $parameters["ids"]));

            $seminars_query = "SELECT id FROM `{$this->prefix}seminars` WHERE event_id IN($ids)";
            $seminar_list = $wpdb->get_results($seminars_query, "ARRAY_A");
            $seminar_ids = array();
            
            foreach($seminar_list as $seminar_row) {
                array_push($seminar_ids, $seminar_row["id"]);
            }

            if (sizeof($seminar_ids) > 0) {
                $seminar_ids = implode(',', $seminar_ids);
                $wpdb->query("DELETE `{$this->prefix}seminars`, 
                                 `{$this->prefix}tags_to_seminars`, 
                                 `{$this->prefix}sessions_to_seminars`, 
                                 `{$this->prefix}speakers_to_seminars`, 
                                 `{$this->prefix}registrations_to_seminar_in_session`
                         FROM `{$this->prefix}seminars` 
                         INNER JOIN `{$this->prefix}tags_to_seminars`
                         INNER JOIN `{$this->prefix}sessions_to_seminars`
                         INNER JOIN `{$this->prefix}speakers_to_seminars`
                         INNER JOIN `{$this->prefix}registrations_to_seminar_in_session`
                         WHERE {$this->prefix}seminars.id IN ($seminar_ids) AND
                               {$this->prefix}tags_to_seminars.seminar_id IN ($seminar_ids) AND
                               {$this->prefix}sessions_to_seminars.seminar_id IN ($seminar_ids) AND
                               {$this->prefix}speakers_to_seminars.seminar_id IN ($seminar_ids) AND
                               {$this->prefix}registrations_to_seminar_in_session.seminar_id IN ($seminar_ids)");
            } 

            $wpdb->query("DELETE FROM `{$this->prefix}tags` WHERE event_id IN($ids);");
            $wpdb->query("DELETE FROM `{$this->prefix}sessions` WHERE event_id IN($ids);");
            $wpdb->query("DELETE FROM `{$this->prefix}registrations` WHERE event_id IN($ids);");

            $count = $wpdb->query("DELETE FROM `{$this->prefix}events` WHERE id IN($ids)");

            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Events gelöscht.");
            } else {
                $response = array("success" => "$count Events gelöscht!");
            }
        } else {
            $response = array("error" => "Es fehlen IDs, um Events zu löschen.");
        }

        return rest_ensure_response($response);
    }


    /**
     * Creates a new event.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_event($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["name"] && $parameters["contact_mail"] && $parameters["default_slot_max"]) {
            $result = $wpdb->insert("{$this->prefix}events", array(
                'name' => $parameters["name"],
                'contact_mail' => $parameters["contact_mail"],
                'default_slot_max' => $parameters["default_slot_max"],
                'additional_params' => $parameters["additional_params"]
            ));

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Neues Event gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Namen, den Kontakt und die max. Teilnehmeranzahl an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Updates an event.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_event($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($request["id"] && $parameters["name"] && $parameters["contact_mail"] && $parameters["default_slot_max"]) {
            $result = $wpdb->update("{$this->prefix}events", array(
                'name' => $parameters["name"],
                'contact_mail' => $parameters["contact_mail"],
                'default_slot_max' => $parameters["default_slot_max"],
                'additional_params' => $parameters["additional_params"]
            ), array('id' => $request["id"]));

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Aktualisiertes Event gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie mindestens die ID, den Namen, den Kontakt und die max. Teilnehmeranzahl an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Get a single event and all related data.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_event($request)
    {
        global $wpdb;
        $response = NULL;

        if ($request["id"]) {
            $event_id = intval($request["id"]);
            $event_query = "SELECT * FROM `{$this->prefix}events` WHERE id = {$event_id};";
            $list = $wpdb->get_results($event_query, "ARRAY_A");

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }
            $response = $list[0];

            $sessions_query = "SELECT * FROM `{$this->prefix}sessions` WHERE event_id = {$event_id};";
            $list = $wpdb->get_results($sessions_query, "ARRAY_A");

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }
            foreach ($list as &$session) {
                $query = "SELECT * FROM `{$this->prefix}sessions_to_seminars` WHERE session_id = {$session["id"]}";
                $seminars = $wpdb->get_results($query, "ARRAY_A");
                $session["count"] = count($seminars);
                $session["seminar_ids"] = array();

                foreach ($seminars as $seminar) {
                    array_push($session["seminar_ids"], $seminar["seminar_id"]);
                }
            }
            $response["sessions"] = $list;

            $speakers_query = "SELECT * FROM `{$this->prefix}speakers`;";
            $list = $wpdb->get_results($speakers_query);

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }
            $response["speakers"] = $list;

            $tags_query = "SELECT * FROM `{$this->prefix}tags` WHERE event_id = {$event_id};";
            $list = $wpdb->get_results($tags_query, "ARRAY_A");

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }
            foreach ($list as &$tag) {
                $query = "SELECT * FROM `{$this->prefix}tags_to_seminars` WHERE tag_id = {$tag["id"]}";
                $seminars = $wpdb->get_results($query, "ARRAY_A");
                $tag["count"] = count($seminars);
            }

            $response["tags"] = $list;

            $seminars_query = "SELECT * FROM `{$this->prefix}seminars` WHERE event_id = {$event_id};";
            $list = $wpdb->get_results($seminars_query, "ARRAY_A");

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            $response["seminars"] = $list;
        } else {
            $response = array("error" => "Bitte geben Sie die Event ID an!");
        }

        return rest_ensure_response($response);
    }

    /****************************************************************************************
     * API ACCESS PERMISSION CHECKS
     ****************************************************************************************/
    public function check_admin()
    {
        return current_user_can('administrator');
    }

    public function check_frontend()
    {
        return true;
    }
}
