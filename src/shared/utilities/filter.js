(function(app){

    'use strict';

    app.SEARCH_TEMPLATE = kendo.template('<div class="km-listview-wrapper bottom-line"><form class="km-filter-form"><div class="km-filter-wrap"><input type="search" placeholder="#=placeholder#"/><a href="\\#" class="km-filter-reset" title="Очистить"><span class="km-icon km-clear"></span><span class="km-text">Очистить</span></a></div></form></div>');

    app.Filter = kendo.Class.extend({
        init: function(filterPlace, dataSource, options) {
            var filter = this,
                events = "change paste";

            this.options = options;
            this.dataSource = dataSource;

            filterPlace.after(app.SEARCH_TEMPLATE({ placeholder: "Найти..." }));

            if (options.autoFilter !== false) {
                events += " keyup";
            }

            this.searchInput = filterPlace.parent().find("input[type=search]")
                .closest("form").on("submit", function(e) {
                    e.preventDefault();
                })
                .end()
                .on("focus", function() {
                    filter._oldFilter = filter.searchInput.val();
                })
                .on(events, $.proxy(this._filterChange, this));

            this.clearButton = filterPlace.parent().find(".km-filter-reset")
                .on("click", $.proxy(this, "_clearFilter"))
                .hide();
        },

        _search: function(expr) {
            this._filter = true;
            this.clearButton[expr ? "show" : "hide"]();
            this.dataSource.filter(expr);
        },

        _filterChange: function(e) {
            var filter = this;
            if (e.type === "paste" && this.options.autoFilter !== false) {
                setTimeout(function() {
                    filter._applyFilter();
                }, 1);
            } else {
                this._applyFilter();
            }
        },

        _applyFilter: function() {
            var options = this.options,
                value = this.searchInput.val(),
                expr = value.length ? {
                    field: options.field,
                    operator: options.operator || "startswith",
                    ignoreCase: options.ignoreCase,
                    value: value
                } : null;

            if (value === this._oldFilter) {
                return;
            }

            this._oldFilter = value;
            this._search(expr);
        },

        _clearFilter: function(e) {
            this.searchInput.val("");
            this._search(null);

            e.preventDefault();
        }
    });
    
})(app);