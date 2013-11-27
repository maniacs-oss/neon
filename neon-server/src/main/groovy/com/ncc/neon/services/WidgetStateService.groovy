package com.ncc.neon.services

import com.ncc.neon.result.MetadataResolver
import com.ncc.neon.state.WidgetStates
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import javax.ws.rs.*
import javax.ws.rs.core.MediaType
/*
 * ************************************************************************
 * Copyright (c), 2013 Next Century Corporation. All Rights Reserved.
 *
 * This software code is the exclusive property of Next Century Corporation and is
 * protected by United States and International laws relating to the protection
 * of intellectual property.  Distribution of this software code by or to an
 * unauthorized party, or removal of any of these notices, is strictly
 * prohibited and punishable by law.
 *
 * UNLESS PROVIDED OTHERWISE IN A LICENSE AGREEMENT GOVERNING THE USE OF THIS
 * SOFTWARE, TO WHICH YOU ARE AN AUTHORIZED PARTY, THIS SOFTWARE CODE HAS BEEN
 * ACQUIRED BY YOU "AS IS" AND WITHOUT WARRANTY OF ANY KIND.  ANY USE BY YOU OF
 * THIS SOFTWARE CODE IS AT YOUR OWN RISK.  ALL WARRANTIES OF ANY KIND, EITHER
 * EXPRESSED OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE HEREBY EXPRESSLY
 * DISCLAIMED.
 *
 * PROPRIETARY AND CONFIDENTIAL TRADE SECRET MATERIAL NOT FOR DISCLOSURE OUTSIDE
 * OF NEXT CENTURY CORPORATION EXCEPT BY PRIOR WRITTEN PERMISSION AND WHEN
 * RECIPIENT IS UNDER OBLIGATION TO MAINTAIN SECRECY.
 *
 * 
 * @author tbrooks
 */

/**
 * Service for saving and restoring widget states.
 */

@Component
@Path("/widgetstateservice")
class WidgetStateService {

    @Autowired
    WidgetStates widgetStates

    @Autowired
    MetadataResolver metadataResolver

    /**
     * Saves the state of the widget to the user's session
     * @param clientId An identifier generated by the client, typically a widget's name
     * @param state json containing information about the widget's state
     */
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Path("savestate")
    void saveState(@FormParam("clientId") String clientId, @FormParam("state") String state) {
        widgetStates.addWidgetState(clientId, state)
    }

    /**
     * Gets a widget's state from the session
     * @param clientId An identifier generated by the client, typically a widget's name
     * @return json containing information about the widget's state, or null if nothing is found.
     */
    @GET
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("restoreState")
    String restoreState(@QueryParam("clientId") String clientId) {
        def widgetState = widgetStates.getWidgetState(clientId)
        if(widgetState){
            return widgetState.state
        }
        return null
    }

    /**
     * Get's a widget state from metadata
     * @param widget An identifier generated by the client, typically a widget's name
     * @return json containing information about the widget's state, or null if nothing is found.
     */
    @GET
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("widgetinitialization")
    String getWidgetInitialization(@QueryParam("widget") String clientId) {
        def data = metadataResolver.getWidgetInitializationData(clientId)
        return data.initDataJson
    }

}
