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
 */
/**
 * This is a wrapper around some of the generic query execution methods that automatically
 * put notifications on the appropriate OWF channels
 * @namespace neon.query
 * @class OWFEventPublisher
 */

neon.namespace('neon.query');

/**
 * Creates a new publisher that publishes messages to the appropriate OWF channel
 * using the specified message handler
 * @param messageHandler Publishes messages to the OWF channels. This may be omitted in which case a new message
 * handler will be created dynamically. However, passing in a handler does allow you to determine which handler
 * sent the message and you can ignore messages sent from your own widget if you choose.
 * @constructor
 */
neon.query.OWFEventPublisher = function(messageHandler) {

    this.messageHandler_ = messageHandler ? messageHandler : new neon.eventing.MessageHandler();
};

/**
 * Adds a filter and sends a message to the {{#crossLink "neon.eventing.Channels/FILTERS_CHANGED:property"}}{{/crossLink}} channel
 * @method addFilter
 * @param {neon.query.Filter} filter The filter to add
 */
neon.query.OWFEventPublisher.prototype.addFilter = function (filter) {
    neon.query.addFilter(filter, this.createChannelCallback_(neon.eventing.Channels.FILTERS_CHANGED));
};


/**
 * Removes a filter and sends a message to the {{#crossLink "neon.eventing.Channels/FILTERS_CHANGED:property"}}{{/crossLink}} channel
 * @method removeFilter
 * @param {String} filterId The id of the filter to remove
 */
neon.query.OWFEventPublisher.prototype.removeFilter = function (filterId) {
    neon.query.removeFilter(filterId, this.createChannelCallback_(neon.eventing.Channels.FILTERS_CHANGED));
};


/**
 * Replaces a filter and sends a message to the {{#crossLink "neon.eventing.Channels/FILTERS_CHANGED:property"}}{{/crossLink}} channel
 * @method replaceFilter
 * @param {String} filterId The id of the filter to replace
 * @param {neon.query.Filter} filter The filter to replace it with
 */
neon.query.OWFEventPublisher.prototype.replaceFilter = function (filterId, filter) {
    neon.query.replaceFilter(filterId, filter, this.createChannelCallback_(neon.eventing.Channels.FILTERS_CHANGED));
};


/**
 * Clears all filter and sends a message to the {{#crossLink "neon.eventing.Channels/FILTERS_CHANGED:property"}}{{/crossLink}} channel
 * @method clearFilters
 */
neon.query.OWFEventPublisher.prototype.clearFilters = function () {
    neon.query.clearFilters(this.createChannelCallback_(neon.eventing.Channels.FILTERS_CHANGED));
};


/**
 * Sets the selection to those items that match the filter and sends a message to the {{#crossLink "neon.eventing.Channels/SELECTION_CHANGED:property"}}{{/crossLink}} channel
 * @method selectSelectionWhere
 * @param {neon.query.Filter} filter Items matching this query will become the selected items
 */
neon.query.OWFEventPublisher.prototype.setSelectionWhere = function (filter) {
    neon.query.setSelectionWhere(filter, this.createChannelCallback_(neon.eventing.Channels.SELECTION_CHANGED));
};

/**
 * Sets the items with the specified id to the current selection and sends a message to the {{#crossLink "neon.eventing.Channels/SELECTION_CHANGED:property"}}{{/crossLink}} channel
 * @method setSelectedIds
 * @param {Array} ids The ids of the set as the current selection
 */
neon.query.OWFEventPublisher.prototype.setSelectedIds = function (ids) {
    neon.query.setSelectedIds(ids, this.createChannelCallback_(neon.eventing.Channels.SELECTION_CHANGED));
};


/**
 * Adds the items with the specified id to the current selection and sends a message to the {{#crossLink "neon.eventing.Channels/SELECTION_CHANGED:property"}}{{/crossLink}} channel
 * @method addSelectedIds
 * @param {Array} ids The ids of the items to add to the current selection
 */
neon.query.OWFEventPublisher.prototype.addSelectedIds = function (ids) {
    neon.query.addSelectedIds(ids, this.createChannelCallback_(neon.eventing.Channels.SELECTION_CHANGED));
};


/**
 * Removes the items with the specified id from the current selection and sends a message to the {{#crossLink "neon.eventing.Channels/SELECTION_CHANGED:property"}}{{/crossLink}} channel
 * @method removeSelectedIds
 * @param {Array} ids The ids of the items to remove from the current selection
 */
neon.query.OWFEventPublisher.prototype.removeSelectedIds = function (ids) {
    neon.query.removeSelectedIds(ids, this.createChannelCallback_(neon.eventing.Channels.SELECTION_CHANGED));
};

/**
 * Clears the current selection and sends a message to the {{#crossLink "neon.eventing.Channels/SELECTION_CHANGED:property"}}{{/crossLink}} channel
 * @method clearSelection
 */
neon.query.OWFEventPublisher.prototype.clearSelection = function () {
    neon.query.clearSelection(this.createChannelCallback_(neon.eventing.Channels.SELECTION_CHANGED));
};

neon.query.OWFEventPublisher.prototype.createChannelCallback_ = function(channelName) {
    var me = this;
    return function(results) {
        me.messageHandler_.publishMessage(channelName, results || {});
    };
};