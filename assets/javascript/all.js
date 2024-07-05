(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // package/moj/all.js
  var require_all = __commonJS({
    "package/moj/all.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        } else {
          root.MOJFrontend = factory();
        }
      })(exports, function() {
        var MOJFrontend2 = {};
        MOJFrontend2.removeAttributeValue = function(el, attr, value) {
          var re, m;
          if (el.getAttribute(attr)) {
            if (el.getAttribute(attr) == value) {
              el.removeAttribute(attr);
            } else {
              re = new RegExp("(^|\\s)" + value + "(\\s|$)");
              m = el.getAttribute(attr).match(re);
              if (m && m.length == 3) {
                el.setAttribute(attr, el.getAttribute(attr).replace(re, m[1] && m[2] ? " " : ""));
              }
            }
          }
        };
        MOJFrontend2.addAttributeValue = function(el, attr, value) {
          var re;
          if (!el.getAttribute(attr)) {
            el.setAttribute(attr, value);
          } else {
            re = new RegExp("(^|\\s)" + value + "(\\s|$)");
            if (!re.test(el.getAttribute(attr))) {
              el.setAttribute(attr, el.getAttribute(attr) + " " + value);
            }
          }
        };
        MOJFrontend2.dragAndDropSupported = function() {
          var div = document.createElement("div");
          return typeof div.ondrop != "undefined";
        };
        MOJFrontend2.formDataSupported = function() {
          return typeof FormData == "function";
        };
        MOJFrontend2.fileApiSupported = function() {
          var input = document.createElement("input");
          input.type = "file";
          return typeof input.files != "undefined";
        };
        MOJFrontend2.nodeListForEach = function(nodes, callback) {
          if (window.NodeList.prototype.forEach) {
            return nodes.forEach(callback);
          }
          for (var i = 0; i < nodes.length; i++) {
            callback.call(window, nodes[i], i, nodes);
          }
        };
        MOJFrontend2.initAll = function(options) {
          options = typeof options !== "undefined" ? options : {};
          var scope = typeof options.scope !== "undefined" ? options.scope : document;
          var $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]');
          MOJFrontend2.nodeListForEach($addAnothers, function($addAnother) {
            new MOJFrontend2.AddAnother($addAnother);
          });
          var $multiSelects = scope.querySelectorAll('[data-module="moj-multi-select"]');
          MOJFrontend2.nodeListForEach($multiSelects, function($multiSelect) {
            new MOJFrontend2.MultiSelect({
              container: $multiSelect.querySelector($multiSelect.getAttribute("data-multi-select-checkbox")),
              checkboxes: $multiSelect.querySelectorAll("tbody .govuk-checkboxes__input")
            });
          });
          var $passwordReveals = scope.querySelectorAll('[data-module="moj-password-reveal"]');
          MOJFrontend2.nodeListForEach($passwordReveals, function($passwordReveal) {
            new MOJFrontend2.PasswordReveal($passwordReveal);
          });
          var $richTextEditors = scope.querySelectorAll('[data-module="moj-rich-text-editor"]');
          MOJFrontend2.nodeListForEach($richTextEditors, function($richTextEditor) {
            var options2 = {
              textarea: $($richTextEditor)
            };
            var toolbarAttr = $richTextEditor.getAttribute("data-moj-rich-text-editor-toolbar");
            if (toolbarAttr) {
              var toolbar = toolbarAttr.split(",");
              options2.toolbar = {};
              for (var item in toolbar) options2.toolbar[toolbar[item]] = true;
            }
            new MOJFrontend2.RichTextEditor(options2);
          });
          var $searchToggles = scope.querySelectorAll('[data-module="moj-search-toggle"]');
          MOJFrontend2.nodeListForEach($searchToggles, function($searchToggle) {
            new MOJFrontend2.SearchToggle({
              toggleButton: {
                container: $($searchToggle.querySelector(".moj-search-toggle__toggle")),
                text: $searchToggle.getAttribute("data-moj-search-toggle-text")
              },
              search: {
                container: $($searchToggle.querySelector(".moj-search"))
              }
            });
          });
          var $sortableTables = scope.querySelectorAll('[data-module="moj-sortable-table"]');
          MOJFrontend2.nodeListForEach($sortableTables, function($table) {
            new MOJFrontend2.SortableTable({
              table: $table
            });
          });
          var $sortableTables = scope.querySelectorAll('[data-module="moj-sortable-table"]');
          MOJFrontend2.nodeListForEach($sortableTables, function($table) {
            new MOJFrontend2.SortableTable({
              table: $table
            });
          });
        };
        MOJFrontend2.AddAnother = function(container) {
          this.container = $(container);
          if (this.container.data("moj-add-another-initialised")) {
            return;
          }
          this.container.data("moj-add-another-initialised", true);
          this.container.on("click", ".moj-add-another__remove-button", $.proxy(this, "onRemoveButtonClick"));
          this.container.on("click", ".moj-add-another__add-button", $.proxy(this, "onAddButtonClick"));
          this.container.find(".moj-add-another__add-button, moj-add-another__remove-button").prop("type", "button");
        };
        MOJFrontend2.AddAnother.prototype.onAddButtonClick = function(e) {
          var item = this.getNewItem();
          this.updateAttributes(this.getItems().length, item);
          this.resetItem(item);
          var firstItem = this.getItems().first();
          if (!this.hasRemoveButton(firstItem)) {
            this.createRemoveButton(firstItem);
          }
          this.getItems().last().after(item);
          item.find("input, textarea, select").first().focus();
        };
        MOJFrontend2.AddAnother.prototype.hasRemoveButton = function(item) {
          return item.find(".moj-add-another__remove-button").length;
        };
        MOJFrontend2.AddAnother.prototype.getItems = function() {
          return this.container.find(".moj-add-another__item");
        };
        MOJFrontend2.AddAnother.prototype.getNewItem = function() {
          var item = this.getItems().first().clone();
          if (!this.hasRemoveButton(item)) {
            this.createRemoveButton(item);
          }
          return item;
        };
        MOJFrontend2.AddAnother.prototype.updateAttributes = function(index, item) {
          item.find("[data-name]").each(function(i, el) {
            var originalId = el.id;
            el.name = $(el).attr("data-name").replace(/%index%/, index);
            el.id = $(el).attr("data-id").replace(/%index%/, index);
            var label = $(el).siblings("label")[0] || $(el).parents("label")[0] || item.find('[for="' + originalId + '"]')[0];
            label.htmlFor = el.id;
          });
        };
        MOJFrontend2.AddAnother.prototype.createRemoveButton = function(item) {
          item.append('<button type="button" class="govuk-button govuk-button--secondary moj-add-another__remove-button">Remove</button>');
        };
        MOJFrontend2.AddAnother.prototype.resetItem = function(item) {
          item.find("[data-name], [data-id]").each(function(index, el) {
            if (el.type == "checkbox" || el.type == "radio") {
              el.checked = false;
            } else {
              el.value = "";
            }
          });
        };
        MOJFrontend2.AddAnother.prototype.onRemoveButtonClick = function(e) {
          $(e.currentTarget).parents(".moj-add-another__item").remove();
          var items = this.getItems();
          if (items.length === 1) {
            items.find(".moj-add-another__remove-button").remove();
          }
          items.each($.proxy(function(index, el) {
            this.updateAttributes(index, $(el));
          }, this));
          this.focusHeading();
        };
        MOJFrontend2.AddAnother.prototype.focusHeading = function() {
          this.container.find(".moj-add-another__heading").focus();
        };
        MOJFrontend2.ButtonMenu = function(params) {
          this.container = $(params.container);
          this.menu = this.container.find(".moj-button-menu__wrapper");
          if (params.menuClasses) {
            this.menu.addClass(params.menuClasses);
          }
          this.menu.attr("role", "menu");
          this.mq = params.mq;
          this.buttonText = params.buttonText;
          this.buttonClasses = params.buttonClasses || "";
          this.keys = { esc: 27, up: 38, down: 40, tab: 9 };
          this.menu.on("keydown", "[role=menuitem]", $.proxy(this, "onButtonKeydown"));
          this.createToggleButton();
          this.setupResponsiveChecks();
          $(document).on("click", $.proxy(this, "onDocumentClick"));
        };
        MOJFrontend2.ButtonMenu.prototype.onDocumentClick = function(e) {
          if (!$.contains(this.container[0], e.target)) {
            this.hideMenu();
          }
        };
        MOJFrontend2.ButtonMenu.prototype.createToggleButton = function() {
          this.menuButton = $('<button class="govuk-button moj-button-menu__toggle-button ' + this.buttonClasses + '" type="button" aria-haspopup="true" aria-expanded="false">' + this.buttonText + "</button>");
          this.menuButton.on("click", $.proxy(this, "onMenuButtonClick"));
          this.menuButton.on("keydown", $.proxy(this, "onMenuKeyDown"));
        };
        MOJFrontend2.ButtonMenu.prototype.setupResponsiveChecks = function() {
          this.mql = window.matchMedia(this.mq);
          this.mql.addListener($.proxy(this, "checkMode"));
          this.checkMode(this.mql);
        };
        MOJFrontend2.ButtonMenu.prototype.checkMode = function(mql) {
          if (mql.matches) {
            this.enableBigMode();
          } else {
            this.enableSmallMode();
          }
        };
        MOJFrontend2.ButtonMenu.prototype.enableSmallMode = function() {
          this.container.prepend(this.menuButton);
          this.hideMenu();
          this.removeButtonClasses();
          this.menu.attr("role", "menu");
          this.container.find(".moj-button-menu__item").attr("role", "menuitem");
        };
        MOJFrontend2.ButtonMenu.prototype.enableBigMode = function() {
          this.menuButton.detach();
          this.showMenu();
          this.addButtonClasses();
          this.menu.removeAttr("role");
          this.container.find(".moj-button-menu__item").removeAttr("role");
        };
        MOJFrontend2.ButtonMenu.prototype.removeButtonClasses = function() {
          this.menu.find(".moj-button-menu__item").each(function(index, el) {
            if ($(el).hasClass("govuk-button--secondary")) {
              $(el).attr("data-secondary", "true");
              $(el).removeClass("govuk-button--secondary");
            }
            if ($(el).hasClass("govuk-button--warning")) {
              $(el).attr("data-warning", "true");
              $(el).removeClass("govuk-button--warning");
            }
            $(el).removeClass("govuk-button");
          });
        };
        MOJFrontend2.ButtonMenu.prototype.addButtonClasses = function() {
          this.menu.find(".moj-button-menu__item").each(function(index, el) {
            if ($(el).attr("data-secondary") == "true") {
              $(el).addClass("govuk-button--secondary");
            }
            if ($(el).attr("data-warning") == "true") {
              $(el).addClass("govuk-button--warning");
            }
            $(el).addClass("govuk-button");
          });
        };
        MOJFrontend2.ButtonMenu.prototype.hideMenu = function() {
          this.menuButton.attr("aria-expanded", "false");
        };
        MOJFrontend2.ButtonMenu.prototype.showMenu = function() {
          this.menuButton.attr("aria-expanded", "true");
        };
        MOJFrontend2.ButtonMenu.prototype.onMenuButtonClick = function() {
          this.toggle();
        };
        MOJFrontend2.ButtonMenu.prototype.toggle = function() {
          if (this.menuButton.attr("aria-expanded") == "false") {
            this.showMenu();
            this.menu.find("[role=menuitem]").first().focus();
          } else {
            this.hideMenu();
            this.menuButton.focus();
          }
        };
        MOJFrontend2.ButtonMenu.prototype.onMenuKeyDown = function(e) {
          switch (e.keyCode) {
            case this.keys.down:
              this.toggle();
              break;
          }
        };
        MOJFrontend2.ButtonMenu.prototype.onButtonKeydown = function(e) {
          switch (e.keyCode) {
            case this.keys.up:
              e.preventDefault();
              this.focusPrevious(e.currentTarget);
              break;
            case this.keys.down:
              e.preventDefault();
              this.focusNext(e.currentTarget);
              break;
            case this.keys.esc:
              if (!this.mql.matches) {
                this.menuButton.focus();
                this.hideMenu();
              }
              break;
            case this.keys.tab:
              if (!this.mql.matches) {
                this.hideMenu();
              }
          }
        };
        MOJFrontend2.ButtonMenu.prototype.focusNext = function(currentButton) {
          var next = $(currentButton).next();
          if (next[0]) {
            next.focus();
          } else {
            this.container.find("[role=menuitem]").first().focus();
          }
        };
        MOJFrontend2.ButtonMenu.prototype.focusPrevious = function(currentButton) {
          var prev = $(currentButton).prev();
          if (prev[0]) {
            prev.focus();
          } else {
            this.container.find("[role=menuitem]").last().focus();
          }
        };
        MOJFrontend2.FilterToggleButton = function(options) {
          this.options = options;
          this.container = $(this.options.toggleButton.container);
          this.filterContainer = $(this.options.filter.container);
          this.createToggleButton();
          this.setupResponsiveChecks();
          this.filterContainer.attr("tabindex", "-1");
          if (this.options.startHidden) {
            this.hideMenu();
          }
        };
        MOJFrontend2.FilterToggleButton.prototype.setupResponsiveChecks = function() {
          this.mq = window.matchMedia(this.options.bigModeMediaQuery);
          this.mq.addListener($.proxy(this, "checkMode"));
          this.checkMode(this.mq);
        };
        MOJFrontend2.FilterToggleButton.prototype.createToggleButton = function() {
          this.menuButton = $('<button class="govuk-button ' + this.options.toggleButton.classes + '" type="button" aria-haspopup="true" aria-expanded="false">' + this.options.toggleButton.showText + "</button>");
          this.menuButton.on("click", $.proxy(this, "onMenuButtonClick"));
          this.container.append(this.menuButton);
        };
        MOJFrontend2.FilterToggleButton.prototype.checkMode = function(mq) {
          if (mq.matches) {
            this.enableBigMode();
          } else {
            this.enableSmallMode();
          }
        };
        MOJFrontend2.FilterToggleButton.prototype.enableBigMode = function() {
          this.showMenu();
          this.removeCloseButton();
        };
        MOJFrontend2.FilterToggleButton.prototype.enableSmallMode = function() {
          this.hideMenu();
          this.addCloseButton();
        };
        MOJFrontend2.FilterToggleButton.prototype.addCloseButton = function() {
          if (this.options.closeButton) {
            this.closeButton = $('<button class="moj-filter__close" type="button">' + this.options.closeButton.text + "</button>");
            this.closeButton.on("click", $.proxy(this, "onCloseClick"));
            $(this.options.closeButton.container).append(this.closeButton);
          }
        };
        MOJFrontend2.FilterToggleButton.prototype.onCloseClick = function() {
          this.hideMenu();
          this.menuButton.focus();
        };
        MOJFrontend2.FilterToggleButton.prototype.removeCloseButton = function() {
          if (this.closeButton) {
            this.closeButton.remove();
            this.closeButton = null;
          }
        };
        MOJFrontend2.FilterToggleButton.prototype.hideMenu = function() {
          this.menuButton.attr("aria-expanded", "false");
          this.filterContainer.addClass("moj-js-hidden");
          this.menuButton.text(this.options.toggleButton.showText);
        };
        MOJFrontend2.FilterToggleButton.prototype.showMenu = function() {
          this.menuButton.attr("aria-expanded", "true");
          this.filterContainer.removeClass("moj-js-hidden");
          this.menuButton.text(this.options.toggleButton.hideText);
        };
        MOJFrontend2.FilterToggleButton.prototype.onMenuButtonClick = function() {
          this.toggle();
        };
        MOJFrontend2.FilterToggleButton.prototype.toggle = function() {
          if (this.menuButton.attr("aria-expanded") == "false") {
            this.showMenu();
            this.filterContainer.focus();
          } else {
            this.hideMenu();
          }
        };
        MOJFrontend2.FormValidator = function(form, options) {
          this.form = form;
          this.errors = [];
          this.validators = [];
          $(this.form).on("submit", $.proxy(this, "onSubmit"));
          this.summary = options && options.summary ? $(options.summary) : $(".govuk-error-summary");
          this.originalTitle = document.title;
        };
        MOJFrontend2.FormValidator.entityMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
          "`": "&#x60;",
          "=": "&#x3D;"
        };
        MOJFrontend2.FormValidator.prototype.escapeHtml = function(string) {
          return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
            return MOJFrontend2.FormValidator.entityMap[s];
          });
        };
        MOJFrontend2.FormValidator.prototype.resetTitle = function() {
          document.title = this.originalTitle;
        };
        MOJFrontend2.FormValidator.prototype.updateTitle = function() {
          document.title = "" + this.errors.length + " errors - " + document.title;
        };
        MOJFrontend2.FormValidator.prototype.showSummary = function() {
          this.summary.html(this.getSummaryHtml());
          this.summary.removeClass("moj-hidden");
          this.summary.attr("aria-labelledby", "errorSummary-heading");
          this.summary.focus();
        };
        MOJFrontend2.FormValidator.prototype.getSummaryHtml = function() {
          var html = '<h2 id="error-summary-title" class="govuk-error-summary__title">There is a problem</h2>';
          html += '<div class="govuk-error-summary__body">';
          html += '<ul class="govuk-list govuk-error-summary__list">';
          for (var i = 0, j = this.errors.length; i < j; i++) {
            var error = this.errors[i];
            html += "<li>";
            html += '<a href="#' + this.escapeHtml(error.fieldName) + '">';
            html += this.escapeHtml(error.message);
            html += "</a>";
            html += "</li>";
          }
          html += "</ul>";
          html += "</div>";
          return html;
        };
        MOJFrontend2.FormValidator.prototype.hideSummary = function() {
          this.summary.addClass("moj-hidden");
          this.summary.removeAttr("aria-labelledby");
        };
        MOJFrontend2.FormValidator.prototype.onSubmit = function(e) {
          this.removeInlineErrors();
          this.hideSummary();
          this.resetTitle();
          if (!this.validate()) {
            e.preventDefault();
            this.updateTitle();
            this.showSummary();
            this.showInlineErrors();
          }
        };
        MOJFrontend2.FormValidator.prototype.showInlineErrors = function() {
          for (var i = 0, j = this.errors.length; i < j; i++) {
            this.showInlineError(this.errors[i]);
          }
        };
        MOJFrontend2.FormValidator.prototype.showInlineError = function(error) {
          var errorSpanId = error.fieldName + "-error";
          var errorSpan = '<span class="govuk-error-message" id="' + errorSpanId + '">' + this.escapeHtml(error.message) + "</span>";
          var control = $("#" + error.fieldName);
          var fieldContainer = control.parents(".govuk-form-group");
          var label = fieldContainer.find("label");
          var legend = fieldContainer.find("legend");
          var fieldset = fieldContainer.find("fieldset");
          fieldContainer.addClass("govuk-form-group--error");
          if (legend.length) {
            legend.after(errorSpan);
            fieldContainer.attr("aria-invalid", "true");
            MOJFrontend2.addAttributeValue(fieldset[0], "aria-describedby", errorSpanId);
          } else {
            label.after(errorSpan);
            control.attr("aria-invalid", "true");
            MOJFrontend2.addAttributeValue(control[0], "aria-describedby", errorSpanId);
          }
        };
        MOJFrontend2.FormValidator.prototype.removeInlineErrors = function() {
          var error;
          var i;
          for (var i = 0; i < this.errors.length; i++) {
            this.removeInlineError(this.errors[i]);
          }
        };
        MOJFrontend2.FormValidator.prototype.removeInlineError = function(error) {
          var control = $("#" + error.fieldName);
          var fieldContainer = control.parents(".govuk-form-group");
          fieldContainer.find(".govuk-error-message").remove();
          fieldContainer.removeClass("govuk-form-group--error");
          fieldContainer.find("[aria-invalid]").attr("aria-invalid", "false");
          var errorSpanId = error.fieldName + "-error";
          MOJFrontend2.removeAttributeValue(fieldContainer.find("[aria-describedby]")[0], "aria-describedby", errorSpanId);
        };
        MOJFrontend2.FormValidator.prototype.addValidator = function(fieldName, rules) {
          this.validators.push({
            fieldName,
            rules,
            field: this.form.elements[fieldName]
          });
        };
        MOJFrontend2.FormValidator.prototype.validate = function() {
          this.errors = [];
          var validator = null, validatorReturnValue = true, i, j;
          for (i = 0; i < this.validators.length; i++) {
            validator = this.validators[i];
            for (j = 0; j < validator.rules.length; j++) {
              validatorReturnValue = validator.rules[j].method(
                validator.field,
                validator.rules[j].params
              );
              if (typeof validatorReturnValue === "boolean" && !validatorReturnValue) {
                this.errors.push({
                  fieldName: validator.fieldName,
                  message: validator.rules[j].message
                });
                break;
              } else if (typeof validatorReturnValue === "string") {
                this.errors.push({
                  fieldName: validatorReturnValue,
                  message: validator.rules[j].message
                });
                break;
              }
            }
          }
          return this.errors.length === 0;
        };
        if (MOJFrontend2.dragAndDropSupported() && MOJFrontend2.formDataSupported() && MOJFrontend2.fileApiSupported()) {
          MOJFrontend2.MultiFileUpload = function(params) {
            this.defaultParams = {
              uploadFileEntryHook: $.noop,
              uploadFileExitHook: $.noop,
              uploadFileErrorHook: $.noop,
              fileDeleteHook: $.noop,
              uploadStatusText: "Uploading files, please wait",
              dropzoneHintText: "Drag and drop files here or",
              dropzoneButtonText: "Choose files"
            };
            this.params = $.extend({}, this.defaultParams, params);
            this.container = $(this.params.container);
            this.container.addClass("moj-multi-file-upload--enhanced");
            this.feedbackContainer = this.container.find(".moj-multi-file__uploaded-files");
            this.setupFileInput();
            this.setupDropzone();
            this.setupLabel();
            this.setupStatusBox();
            this.container.on("click", ".moj-multi-file-upload__delete", $.proxy(this, "onFileDeleteClick"));
          };
          MOJFrontend2.MultiFileUpload.prototype.setupDropzone = function() {
            this.fileInput.wrap('<div class="moj-multi-file-upload__dropzone" />');
            this.dropzone = this.container.find(".moj-multi-file-upload__dropzone");
            this.dropzone.on("dragover", $.proxy(this, "onDragOver"));
            this.dropzone.on("dragleave", $.proxy(this, "onDragLeave"));
            this.dropzone.on("drop", $.proxy(this, "onDrop"));
          };
          MOJFrontend2.MultiFileUpload.prototype.setupLabel = function() {
            this.label = $('<label for="' + this.fileInput[0].id + '" class="govuk-button govuk-button--secondary">' + this.params.dropzoneButtonText + "</label>");
            this.dropzone.append('<p class="govuk-body">' + this.params.dropzoneHintText + "</p>");
            this.dropzone.append(this.label);
          };
          MOJFrontend2.MultiFileUpload.prototype.setupFileInput = function() {
            this.fileInput = this.container.find(".moj-multi-file-upload__input");
            this.fileInput.on("change", $.proxy(this, "onFileChange"));
            this.fileInput.on("focus", $.proxy(this, "onFileFocus"));
            this.fileInput.on("blur", $.proxy(this, "onFileBlur"));
          };
          MOJFrontend2.MultiFileUpload.prototype.setupStatusBox = function() {
            this.status = $('<div aria-live="polite" role="status" class="govuk-visually-hidden" />');
            this.dropzone.append(this.status);
          };
          MOJFrontend2.MultiFileUpload.prototype.onDragOver = function(e) {
            e.preventDefault();
            this.dropzone.addClass("moj-multi-file-upload--dragover");
          };
          MOJFrontend2.MultiFileUpload.prototype.onDragLeave = function() {
            this.dropzone.removeClass("moj-multi-file-upload--dragover");
          };
          MOJFrontend2.MultiFileUpload.prototype.onDrop = function(e) {
            e.preventDefault();
            this.dropzone.removeClass("moj-multi-file-upload--dragover");
            this.feedbackContainer.removeClass("moj-hidden");
            this.status.html(this.params.uploadStatusText);
            this.uploadFiles(e.originalEvent.dataTransfer.files);
          };
          MOJFrontend2.MultiFileUpload.prototype.uploadFiles = function(files) {
            for (var i = 0; i < files.length; i++) {
              this.uploadFile(files[i]);
            }
          };
          MOJFrontend2.MultiFileUpload.prototype.onFileChange = function(e) {
            this.feedbackContainer.removeClass("moj-hidden");
            this.status.html(this.params.uploadStatusText);
            this.uploadFiles(e.currentTarget.files);
            this.fileInput.replaceWith($(e.currentTarget).val("").clone(true));
            this.setupFileInput();
            this.fileInput.focus();
          };
          MOJFrontend2.MultiFileUpload.prototype.onFileFocus = function(e) {
            this.label.addClass("moj-multi-file-upload--focused");
          };
          MOJFrontend2.MultiFileUpload.prototype.onFileBlur = function(e) {
            this.label.removeClass("moj-multi-file-upload--focused");
          };
          MOJFrontend2.MultiFileUpload.prototype.getSuccessHtml = function(success) {
            return '<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> ' + success.messageHtml + "</span>";
          };
          MOJFrontend2.MultiFileUpload.prototype.getErrorHtml = function(error) {
            return '<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg> ' + error.message + "</span>";
          };
          MOJFrontend2.MultiFileUpload.prototype.getFileRowHtml = function(file) {
            var html = "";
            html += '<div class="govuk-summary-list__row moj-multi-file-upload__row">';
            html += '  <div class="govuk-summary-list__value moj-multi-file-upload__message">';
            html += '<span class="moj-multi-file-upload__filename">' + file.name + "</span>";
            html += '<span class="moj-multi-file-upload__progress">0%</span>';
            html += "  </div>";
            html += '  <div class="govuk-summary-list__actions moj-multi-file-upload__actions"></div>';
            html += "</div>";
            return html;
          };
          MOJFrontend2.MultiFileUpload.prototype.getDeleteButtonHtml = function(file) {
            var html = '<button class="moj-multi-file-upload__delete govuk-button govuk-button--secondary govuk-!-margin-bottom-0" type="button" name="delete" value="' + file.filename + '">';
            html += 'Delete <span class="govuk-visually-hidden">' + file.originalname + "</span>";
            html += "</button>";
            return html;
          };
          MOJFrontend2.MultiFileUpload.prototype.uploadFile = function(file) {
            this.params.uploadFileEntryHook(this, file);
            var formData = new FormData();
            formData.append("documents", file);
            var item = $(this.getFileRowHtml(file));
            this.feedbackContainer.find(".moj-multi-file-upload__list").append(item);
            $.ajax({
              url: this.params.uploadUrl,
              type: "post",
              data: formData,
              processData: false,
              contentType: false,
              success: $.proxy(function(response) {
                if (response.error) {
                  item.find(".moj-multi-file-upload__message").html(this.getErrorHtml(response.error));
                  this.status.html(response.error.message);
                } else {
                  item.find(".moj-multi-file-upload__message").html(this.getSuccessHtml(response.success));
                  this.status.html(response.success.messageText);
                }
                item.find(".moj-multi-file-upload__actions").append(this.getDeleteButtonHtml(response.file));
                this.params.uploadFileExitHook(this, file, response);
              }, this),
              error: $.proxy(function(jqXHR, textStatus, errorThrown) {
                this.params.uploadFileErrorHook(this, file, jqXHR, textStatus, errorThrown);
              }, this),
              xhr: function() {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(e) {
                  if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    percentComplete = parseInt(percentComplete * 100, 10);
                    item.find(".moj-multi-file-upload__progress").text(" " + percentComplete + "%");
                  }
                }, false);
                return xhr;
              }
            });
          };
          MOJFrontend2.MultiFileUpload.prototype.onFileDeleteClick = function(e) {
            e.preventDefault();
            var button = $(e.currentTarget);
            var data = {};
            data[button[0].name] = button[0].value;
            $.ajax({
              url: this.params.deleteUrl,
              type: "post",
              dataType: "json",
              data,
              success: $.proxy(function(response) {
                if (response.error) {
                } else {
                  button.parents(".moj-multi-file-upload__row").remove();
                  if (this.feedbackContainer.find(".moj-multi-file-upload__row").length === 0) {
                    this.feedbackContainer.addClass("moj-hidden");
                  }
                }
                this.params.fileDeleteHook(this, response);
              }, this)
            });
          };
        }
        MOJFrontend2.MultiSelect = function(options) {
          this.container = $(options.container);
          if (this.container.data("moj-multi-select-initialised")) {
            return;
          }
          this.container.data("moj-multi-select-initialised", true);
          this.toggle = $(this.getToggleHtml());
          this.toggleButton = this.toggle.find("input");
          this.toggleButton.on("click", $.proxy(this, "onButtonClick"));
          this.container.append(this.toggle);
          this.checkboxes = $(options.checkboxes);
          this.checkboxes.on("click", $.proxy(this, "onCheckboxClick"));
          this.checked = options.checked || false;
        };
        MOJFrontend2.MultiSelect.prototype.getToggleHtml = function() {
          var html = "";
          html += '<div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">';
          html += '  <input type="checkbox" class="govuk-checkboxes__input" id="checkboxes-all">';
          html += '  <label class="govuk-label govuk-checkboxes__label moj-multi-select__toggle-label" for="checkboxes-all">';
          html += '    <span class="govuk-visually-hidden">Select all</span>';
          html += "  </label>";
          html += "</div>";
          return html;
        };
        MOJFrontend2.MultiSelect.prototype.onButtonClick = function(e) {
          if (this.checked) {
            this.uncheckAll();
            this.toggleButton[0].checked = false;
          } else {
            this.checkAll();
            this.toggleButton[0].checked = true;
          }
        };
        MOJFrontend2.MultiSelect.prototype.checkAll = function() {
          this.checkboxes.each($.proxy(function(index, el) {
            el.checked = true;
          }, this));
          this.checked = true;
        };
        MOJFrontend2.MultiSelect.prototype.uncheckAll = function() {
          this.checkboxes.each($.proxy(function(index, el) {
            el.checked = false;
          }, this));
          this.checked = false;
        };
        MOJFrontend2.MultiSelect.prototype.onCheckboxClick = function(e) {
          if (!e.target.checked) {
            this.toggleButton[0].checked = false;
            this.checked = false;
          } else {
            if (this.checkboxes.filter(":checked").length === this.checkboxes.length) {
              this.toggleButton[0].checked = true;
              this.checked = true;
            }
          }
        };
        MOJFrontend2.PasswordReveal = function(element) {
          this.el = element;
          var $el = $(this.el);
          if ($el.data("moj-password-reveal-initialised")) {
            return;
          }
          $el.data("moj-password-reveal-initialised", true);
          $el.attr("spellcheck", "false");
          $el.wrap('<div class="moj-password-reveal"></div>');
          this.container = $(this.el).parent();
          this.createButton();
        };
        MOJFrontend2.PasswordReveal.prototype.createButton = function() {
          this.button = $('<button type="button" class="govuk-button govuk-button--secondary moj-password-reveal__button">Show <span class="govuk-visually-hidden">password</span></button>');
          this.container.append(this.button);
          this.button.on("click", $.proxy(this, "onButtonClick"));
        };
        MOJFrontend2.PasswordReveal.prototype.onButtonClick = function() {
          if (this.el.type === "password") {
            this.el.type = "text";
            this.button.html('Hide <span class="govuk-visually-hidden">password</span>');
          } else {
            this.el.type = "password";
            this.button.html('Show <span class="govuk-visually-hidden">password</span>');
          }
        };
        if ("contentEditable" in document.documentElement) {
          MOJFrontend2.RichTextEditor = function(options) {
            this.options = options;
            this.options.toolbar = this.options.toolbar || {
              bold: false,
              italic: false,
              underline: false,
              bullets: true,
              numbers: true
            };
            this.textarea = this.options.textarea;
            this.container = $(this.textarea).parent();
            if (this.container.data("moj-rich-text-editor-initialised")) {
              return;
            }
            this.container.data("moj-rich-text-editor-initialised", true);
            this.createToolbar();
            this.hideDefault();
            this.configureToolbar();
            this.keys = {
              left: 37,
              right: 39,
              up: 38,
              down: 40
            };
            this.container.on("click", ".moj-rich-text-editor__toolbar-button", $.proxy(this, "onButtonClick"));
            this.container.find(".moj-rich-text-editor__content").on("input", $.proxy(this, "onEditorInput"));
            this.container.find("label").on("click", $.proxy(this, "onLabelClick"));
            this.toolbar.on("keydown", $.proxy(this, "onToolbarKeydown"));
          };
          MOJFrontend2.RichTextEditor.prototype.onToolbarKeydown = function(e) {
            var focusableButton;
            switch (e.keyCode) {
              case this.keys.right:
              case this.keys.down:
                focusableButton = this.toolbar.find("button[tabindex=0]");
                var nextButton = focusableButton.next("button");
                if (nextButton[0]) {
                  nextButton.focus();
                  focusableButton.attr("tabindex", "-1");
                  nextButton.attr("tabindex", "0");
                }
                break;
              case this.keys.left:
              case this.keys.up:
                focusableButton = this.toolbar.find("button[tabindex=0]");
                var previousButton = focusableButton.prev("button");
                if (previousButton[0]) {
                  previousButton.focus();
                  focusableButton.attr("tabindex", "-1");
                  previousButton.attr("tabindex", "0");
                }
                break;
            }
          };
          MOJFrontend2.RichTextEditor.prototype.getToolbarHtml = function() {
            var html = "";
            html += '<div class="moj-rich-text-editor__toolbar" role="toolbar">';
            if (this.options.toolbar.bold) {
              html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>';
            }
            if (this.options.toolbar.italic) {
              html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>';
            }
            if (this.options.toolbar.underline) {
              html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>';
            }
            if (this.options.toolbar.bullets) {
              html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>';
            }
            if (this.options.toolbar.numbers) {
              html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>';
            }
            html += "</div>";
            return html;
          };
          MOJFrontend2.RichTextEditor.prototype.getEnhancedHtml = function(val) {
            return this.getToolbarHtml() + '<div class="govuk-textarea moj-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>';
          };
          MOJFrontend2.RichTextEditor.prototype.hideDefault = function() {
            this.textarea = this.container.find("textarea");
            this.textarea.addClass("govuk-visually-hidden");
            this.textarea.attr("aria-hidden", true);
            this.textarea.attr("tabindex", "-1");
          };
          MOJFrontend2.RichTextEditor.prototype.createToolbar = function() {
            this.toolbar = document.createElement("div");
            this.toolbar.className = "moj-rich-text-editor";
            this.toolbar.innerHTML = this.getEnhancedHtml();
            this.container.append(this.toolbar);
            this.toolbar = this.container.find(".moj-rich-text-editor__toolbar");
            this.container.find(".moj-rich-text-editor__content").html(this.textarea.val());
          };
          MOJFrontend2.RichTextEditor.prototype.configureToolbar = function() {
            this.buttons = this.container.find(".moj-rich-text-editor__toolbar-button");
            this.buttons.prop("tabindex", "-1");
            var firstTab = this.buttons.first();
            firstTab.prop("tabindex", "0");
          };
          MOJFrontend2.RichTextEditor.prototype.onButtonClick = function(e) {
            document.execCommand($(e.currentTarget).data("command"), false, null);
          };
          MOJFrontend2.RichTextEditor.prototype.getContent = function() {
            return this.container.find(".moj-rich-text-editor__content").html();
          };
          MOJFrontend2.RichTextEditor.prototype.onEditorInput = function(e) {
            this.updateTextarea();
          };
          MOJFrontend2.RichTextEditor.prototype.updateTextarea = function() {
            document.execCommand("defaultParagraphSeparator", false, "p");
            this.textarea.val(this.getContent());
          };
          MOJFrontend2.RichTextEditor.prototype.onLabelClick = function(e) {
            e.preventDefault();
            this.container.find(".moj-rich-text-editor__content").focus();
          };
        }
        MOJFrontend2.SearchToggle = function(options) {
          this.options = options;
          this.container = $(this.options.search.container);
          this.toggleButtonContainer = $(this.options.toggleButton.container);
          if (this.container.data("moj-search-toggle-initialised")) {
            return;
          }
          this.container.data("moj-search-toggle-initialised", true);
          const svg = '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="moj-search-toggle__button__icon"><path d="M7.433,12.5790048 C6.06762625,12.5808611 4.75763941,12.0392925 3.79217348,11.0738265 C2.82670755,10.1083606 2.28513891,8.79837375 2.28699522,7.433 C2.28513891,6.06762625 2.82670755,4.75763941 3.79217348,3.79217348 C4.75763941,2.82670755 6.06762625,2.28513891 7.433,2.28699522 C8.79837375,2.28513891 10.1083606,2.82670755 11.0738265,3.79217348 C12.0392925,4.75763941 12.5808611,6.06762625 12.5790048,7.433 C12.5808611,8.79837375 12.0392925,10.1083606 11.0738265,11.0738265 C10.1083606,12.0392925 8.79837375,12.5808611 7.433,12.5790048 L7.433,12.5790048 Z M14.293,12.579 L13.391,12.579 L13.071,12.269 C14.2300759,10.9245158 14.8671539,9.20813198 14.866,7.433 C14.866,3.32786745 11.5381325,-1.65045755e-15 7.433,-1.65045755e-15 C3.32786745,-1.65045755e-15 -1.65045755e-15,3.32786745 -1.65045755e-15,7.433 C-1.65045755e-15,11.5381325 3.32786745,14.866 7.433,14.866 C9.208604,14.8671159 10.9253982,14.2296624 12.27,13.07 L12.579,13.39 L12.579,14.294 L18.296,20 L20,18.296 L14.294,12.579 L14.293,12.579 Z"></path></svg>';
          this.toggleButton = $(
            '<button class="moj-search-toggle__button" type="button" aria-haspopup="true" aria-expanded="false">' + this.options.toggleButton.text + svg + "</button>"
          );
          this.toggleButton.on("click", $.proxy(this, "onToggleButtonClick"));
          this.toggleButtonContainer.append(this.toggleButton);
          $(document).on("click", this.onDocumentClick.bind(this));
          $(document).on("focusin", this.onDocumentClick.bind(this));
        };
        MOJFrontend2.SearchToggle.prototype.showMenu = function() {
          this.toggleButton.attr("aria-expanded", "true");
          this.container.removeClass("moj-js-hidden");
          this.container.find("input").first().focus();
        };
        MOJFrontend2.SearchToggle.prototype.hideMenu = function() {
          this.container.addClass("moj-js-hidden");
          this.toggleButton.attr("aria-expanded", "false");
        };
        MOJFrontend2.SearchToggle.prototype.onToggleButtonClick = function() {
          if (this.toggleButton.attr("aria-expanded") == "false") {
            this.showMenu();
          } else {
            this.hideMenu();
          }
        };
        MOJFrontend2.SearchToggle.prototype.onDocumentClick = function(e) {
          if (!$.contains(this.toggleButtonContainer[0], e.target) && !$.contains(this.container[0], e.target)) {
            this.hideMenu();
          }
        };
        MOJFrontend2.SortableTable = function(params) {
          this.table = $(params.table);
          if (this.table.data("moj-search-toggle-initialised")) {
            return;
          }
          this.table.data("moj-search-toggle-initialised", true);
          this.setupOptions(params);
          this.body = this.table.find("tbody");
          this.createHeadingButtons();
          this.createStatusBox();
          this.initialiseSortedColumn();
          this.table.on("click", "th button", $.proxy(this, "onSortButtonClick"));
        };
        MOJFrontend2.SortableTable.prototype.setupOptions = function(params) {
          params = params || {};
          this.statusMessage = params.statusMessage || "Sort by %heading% (%direction%)";
          this.ascendingText = params.ascendingText || "ascending";
          this.descendingText = params.descendingText || "descending";
        };
        MOJFrontend2.SortableTable.prototype.createHeadingButtons = function() {
          var headings = this.table.find("thead th");
          var heading;
          for (var i = 0; i < headings.length; i++) {
            heading = $(headings[i]);
            if (heading.attr("aria-sort")) {
              this.createHeadingButton(heading, i);
            }
          }
        };
        MOJFrontend2.SortableTable.prototype.createHeadingButton = function(heading, i) {
          var text = heading.text();
          var button = $('<button type="button" data-index="' + i + '">' + text + "</button>");
          heading.text("");
          heading.append(button);
        };
        MOJFrontend2.SortableTable.prototype.createStatusBox = function() {
          this.status = $('<div aria-live="polite" role="status" aria-atomic="true" class="govuk-visually-hidden" />');
          this.table.parent().append(this.status);
        };
        MOJFrontend2.SortableTable.prototype.initialiseSortedColumn = function() {
          var rows = this.getTableRowsArray();
          this.table.find("th").filter('[aria-sort="ascending"], [aria-sort="descending"]').first().each((index, el) => {
            var sortDirection = $(el).attr("aria-sort");
            var columnNumber = $(el).find("button").attr("data-index");
            var sortedRows = this.sort(rows, columnNumber, sortDirection);
            this.addRows(sortedRows);
          });
        };
        MOJFrontend2.SortableTable.prototype.onSortButtonClick = function(e) {
          var columnNumber = e.currentTarget.getAttribute("data-index");
          var sortDirection = $(e.currentTarget).parent().attr("aria-sort");
          var newSortDirection;
          if (sortDirection === "none" || sortDirection === "descending") {
            newSortDirection = "ascending";
          } else {
            newSortDirection = "descending";
          }
          var rows = this.getTableRowsArray();
          var sortedRows = this.sort(rows, columnNumber, newSortDirection);
          this.addRows(sortedRows);
          this.removeButtonStates();
          this.updateButtonState($(e.currentTarget), newSortDirection);
        };
        MOJFrontend2.SortableTable.prototype.updateButtonState = function(button, direction) {
          button.parent().attr("aria-sort", direction);
          var message = this.statusMessage;
          message = message.replace(/%heading%/, button.text());
          message = message.replace(/%direction%/, this[direction + "Text"]);
          this.status.text(message);
        };
        MOJFrontend2.SortableTable.prototype.removeButtonStates = function() {
          this.table.find("thead th").attr("aria-sort", "none");
        };
        MOJFrontend2.SortableTable.prototype.addRows = function(rows) {
          for (var i = 0; i < rows.length; i++) {
            this.body.append(rows[i]);
          }
        };
        MOJFrontend2.SortableTable.prototype.getTableRowsArray = function() {
          var rows = [];
          var trs = this.body.find("tr");
          for (var i = 0; i < trs.length; i++) {
            rows.push(trs[i]);
          }
          return rows;
        };
        MOJFrontend2.SortableTable.prototype.sort = function(rows, columnNumber, sortDirection) {
          var newRows = rows.sort(function(rowA, rowB) {
            var tdA = $(rowA).find("td,th").eq(columnNumber);
            var tdB = $(rowB).find("td,th").eq(columnNumber);
            var valueA = sortDirection === "ascending" ? this.getCellValue(tdA) : this.getCellValue(tdB);
            var valueB = sortDirection === "ascending" ? this.getCellValue(tdB) : this.getCellValue(tdA);
            if (typeof valueA === "string" || typeof valueB === "string") return valueA.toString().localeCompare(valueB.toString());
            return valueA - valueB;
          }.bind(this));
          return newRows;
        };
        MOJFrontend2.SortableTable.prototype.getCellValue = function(cell) {
          var val = cell.attr("data-sort-value") || cell.html();
          var floatVal = parseFloat(val);
          return isNaN(floatVal) ? val : floatVal;
        };
        return MOJFrontend2;
      });
    }
  });

  // node_modules/clipboard/dist/clipboard.js
  var require_clipboard = __commonJS({
    "node_modules/clipboard/dist/clipboard.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["ClipboardJS"] = factory();
        else
          root["ClipboardJS"] = factory();
      })(exports, function() {
        return (
          /******/
          function() {
            var __webpack_modules__ = {
              /***/
              686: (
                /***/
                function(__unused_webpack_module, __webpack_exports__, __webpack_require__2) {
                  "use strict";
                  __webpack_require__2.d(__webpack_exports__, {
                    "default": function() {
                      return (
                        /* binding */
                        clipboard
                      );
                    }
                  });
                  var tiny_emitter = __webpack_require__2(279);
                  var tiny_emitter_default = /* @__PURE__ */ __webpack_require__2.n(tiny_emitter);
                  var listen = __webpack_require__2(370);
                  var listen_default = /* @__PURE__ */ __webpack_require__2.n(listen);
                  var src_select = __webpack_require__2(817);
                  var select_default = /* @__PURE__ */ __webpack_require__2.n(src_select);
                  ;
                  function command(type) {
                    try {
                      return document.execCommand(type);
                    } catch (err) {
                      return false;
                    }
                  }
                  ;
                  var ClipboardActionCut = function ClipboardActionCut2(target) {
                    var selectedText = select_default()(target);
                    command("cut");
                    return selectedText;
                  };
                  var actions_cut = ClipboardActionCut;
                  ;
                  function createFakeElement(value) {
                    var isRTL = document.documentElement.getAttribute("dir") === "rtl";
                    var fakeElement = document.createElement("textarea");
                    fakeElement.style.fontSize = "12pt";
                    fakeElement.style.border = "0";
                    fakeElement.style.padding = "0";
                    fakeElement.style.margin = "0";
                    fakeElement.style.position = "absolute";
                    fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    fakeElement.style.top = "".concat(yPosition, "px");
                    fakeElement.setAttribute("readonly", "");
                    fakeElement.value = value;
                    return fakeElement;
                  }
                  ;
                  var fakeCopyAction = function fakeCopyAction2(value, options) {
                    var fakeElement = createFakeElement(value);
                    options.container.appendChild(fakeElement);
                    var selectedText = select_default()(fakeElement);
                    command("copy");
                    fakeElement.remove();
                    return selectedText;
                  };
                  var ClipboardActionCopy = function ClipboardActionCopy2(target) {
                    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                      container: document.body
                    };
                    var selectedText = "";
                    if (typeof target === "string") {
                      selectedText = fakeCopyAction(target, options);
                    } else if (target instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(target === null || target === void 0 ? void 0 : target.type)) {
                      selectedText = fakeCopyAction(target.value, options);
                    } else {
                      selectedText = select_default()(target);
                      command("copy");
                    }
                    return selectedText;
                  };
                  var actions_copy = ClipboardActionCopy;
                  ;
                  function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      _typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      _typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return _typeof(obj);
                  }
                  var ClipboardActionDefault = function ClipboardActionDefault2() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    var _options$action = options.action, action = _options$action === void 0 ? "copy" : _options$action, container = options.container, target = options.target, text = options.text;
                    if (action !== "copy" && action !== "cut") {
                      throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                    if (target !== void 0) {
                      if (target && _typeof(target) === "object" && target.nodeType === 1) {
                        if (action === "copy" && target.hasAttribute("disabled")) {
                          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }
                        if (action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                          throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                        }
                      } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                      }
                    }
                    if (text) {
                      return actions_copy(text, {
                        container
                      });
                    }
                    if (target) {
                      return action === "cut" ? actions_cut(target) : actions_copy(target, {
                        container
                      });
                    }
                  };
                  var actions_default = ClipboardActionDefault;
                  ;
                  function clipboard_typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      clipboard_typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      clipboard_typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return clipboard_typeof(obj);
                  }
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                      throw new TypeError("Cannot call a class as a function");
                    }
                  }
                  function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                      var descriptor = props[i];
                      descriptor.enumerable = descriptor.enumerable || false;
                      descriptor.configurable = true;
                      if ("value" in descriptor) descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                  }
                  function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                      throw new TypeError("Super expression must either be null or a function");
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
                    if (superClass) _setPrototypeOf(subClass, superClass);
                  }
                  function _setPrototypeOf(o, p) {
                    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
                      o2.__proto__ = p2;
                      return o2;
                    };
                    return _setPrototypeOf(o, p);
                  }
                  function _createSuper(Derived) {
                    var hasNativeReflectConstruct = _isNativeReflectConstruct();
                    return function _createSuperInternal() {
                      var Super = _getPrototypeOf(Derived), result;
                      if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                      } else {
                        result = Super.apply(this, arguments);
                      }
                      return _possibleConstructorReturn(this, result);
                    };
                  }
                  function _possibleConstructorReturn(self, call) {
                    if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) {
                      return call;
                    }
                    return _assertThisInitialized(self);
                  }
                  function _assertThisInitialized(self) {
                    if (self === void 0) {
                      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return self;
                  }
                  function _isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                    if (Reflect.construct.sham) return false;
                    if (typeof Proxy === "function") return true;
                    try {
                      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                      }));
                      return true;
                    } catch (e) {
                      return false;
                    }
                  }
                  function _getPrototypeOf(o) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
                      return o2.__proto__ || Object.getPrototypeOf(o2);
                    };
                    return _getPrototypeOf(o);
                  }
                  function getAttributeValue(suffix, element) {
                    var attribute = "data-clipboard-".concat(suffix);
                    if (!element.hasAttribute(attribute)) {
                      return;
                    }
                    return element.getAttribute(attribute);
                  }
                  var Clipboard = /* @__PURE__ */ function(_Emitter) {
                    _inherits(Clipboard2, _Emitter);
                    var _super = _createSuper(Clipboard2);
                    function Clipboard2(trigger, options) {
                      var _this;
                      _classCallCheck(this, Clipboard2);
                      _this = _super.call(this);
                      _this.resolveOptions(options);
                      _this.listenClick(trigger);
                      return _this;
                    }
                    _createClass(Clipboard2, [{
                      key: "resolveOptions",
                      value: function resolveOptions() {
                        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                        this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                        this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                        this.text = typeof options.text === "function" ? options.text : this.defaultText;
                        this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
                      }
                      /**
                       * Adds a click event listener to the passed trigger.
                       * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                       */
                    }, {
                      key: "listenClick",
                      value: function listenClick(trigger) {
                        var _this2 = this;
                        this.listener = listen_default()(trigger, "click", function(e) {
                          return _this2.onClick(e);
                        });
                      }
                      /**
                       * Defines a new `ClipboardAction` on each click event.
                       * @param {Event} e
                       */
                    }, {
                      key: "onClick",
                      value: function onClick(e) {
                        var trigger = e.delegateTarget || e.currentTarget;
                        var action = this.action(trigger) || "copy";
                        var text = actions_default({
                          action,
                          container: this.container,
                          target: this.target(trigger),
                          text: this.text(trigger)
                        });
                        this.emit(text ? "success" : "error", {
                          action,
                          text,
                          trigger,
                          clearSelection: function clearSelection() {
                            if (trigger) {
                              trigger.focus();
                            }
                            window.getSelection().removeAllRanges();
                          }
                        });
                      }
                      /**
                       * Default `action` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultAction",
                      value: function defaultAction(trigger) {
                        return getAttributeValue("action", trigger);
                      }
                      /**
                       * Default `target` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultTarget",
                      value: function defaultTarget(trigger) {
                        var selector = getAttributeValue("target", trigger);
                        if (selector) {
                          return document.querySelector(selector);
                        }
                      }
                      /**
                       * Allow fire programmatically a copy action
                       * @param {String|HTMLElement} target
                       * @param {Object} options
                       * @returns Text copied.
                       */
                    }, {
                      key: "defaultText",
                      /**
                       * Default `text` lookup function.
                       * @param {Element} trigger
                       */
                      value: function defaultText(trigger) {
                        return getAttributeValue("text", trigger);
                      }
                      /**
                       * Destroy lifecycle.
                       */
                    }, {
                      key: "destroy",
                      value: function destroy() {
                        this.listener.destroy();
                      }
                    }], [{
                      key: "copy",
                      value: function copy(target) {
                        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                          container: document.body
                        };
                        return actions_copy(target, options);
                      }
                      /**
                       * Allow fire programmatically a cut action
                       * @param {String|HTMLElement} target
                       * @returns Text cutted.
                       */
                    }, {
                      key: "cut",
                      value: function cut(target) {
                        return actions_cut(target);
                      }
                      /**
                       * Returns the support of the given action, or all actions if no action is
                       * given.
                       * @param {String} [action]
                       */
                    }, {
                      key: "isSupported",
                      value: function isSupported2() {
                        var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                        var actions = typeof action === "string" ? [action] : action;
                        var support = !!document.queryCommandSupported;
                        actions.forEach(function(action2) {
                          support = support && !!document.queryCommandSupported(action2);
                        });
                        return support;
                      }
                    }]);
                    return Clipboard2;
                  }(tiny_emitter_default());
                  var clipboard = Clipboard;
                }
              ),
              /***/
              828: (
                /***/
                function(module2) {
                  var DOCUMENT_NODE_TYPE = 9;
                  if (typeof Element !== "undefined" && !Element.prototype.matches) {
                    var proto = Element.prototype;
                    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                  }
                  function closest(element, selector) {
                    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                      if (typeof element.matches === "function" && element.matches(selector)) {
                        return element;
                      }
                      element = element.parentNode;
                    }
                  }
                  module2.exports = closest;
                }
              ),
              /***/
              438: (
                /***/
                function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var closest = __webpack_require__2(828);
                  function _delegate(element, selector, type, callback, useCapture) {
                    var listenerFn = listener.apply(this, arguments);
                    element.addEventListener(type, listenerFn, useCapture);
                    return {
                      destroy: function() {
                        element.removeEventListener(type, listenerFn, useCapture);
                      }
                    };
                  }
                  function delegate(elements, selector, type, callback, useCapture) {
                    if (typeof elements.addEventListener === "function") {
                      return _delegate.apply(null, arguments);
                    }
                    if (typeof type === "function") {
                      return _delegate.bind(null, document).apply(null, arguments);
                    }
                    if (typeof elements === "string") {
                      elements = document.querySelectorAll(elements);
                    }
                    return Array.prototype.map.call(elements, function(element) {
                      return _delegate(element, selector, type, callback, useCapture);
                    });
                  }
                  function listener(element, selector, type, callback) {
                    return function(e) {
                      e.delegateTarget = closest(e.target, selector);
                      if (e.delegateTarget) {
                        callback.call(element, e);
                      }
                    };
                  }
                  module2.exports = delegate;
                }
              ),
              /***/
              879: (
                /***/
                function(__unused_webpack_module, exports2) {
                  exports2.node = function(value) {
                    return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
                  };
                  exports2.nodeList = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
                  };
                  exports2.string = function(value) {
                    return typeof value === "string" || value instanceof String;
                  };
                  exports2.fn = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return type === "[object Function]";
                  };
                }
              ),
              /***/
              370: (
                /***/
                function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var is = __webpack_require__2(879);
                  var delegate = __webpack_require__2(438);
                  function listen(target, type, callback) {
                    if (!target && !type && !callback) {
                      throw new Error("Missing required arguments");
                    }
                    if (!is.string(type)) {
                      throw new TypeError("Second argument must be a String");
                    }
                    if (!is.fn(callback)) {
                      throw new TypeError("Third argument must be a Function");
                    }
                    if (is.node(target)) {
                      return listenNode(target, type, callback);
                    } else if (is.nodeList(target)) {
                      return listenNodeList(target, type, callback);
                    } else if (is.string(target)) {
                      return listenSelector(target, type, callback);
                    } else {
                      throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                    }
                  }
                  function listenNode(node, type, callback) {
                    node.addEventListener(type, callback);
                    return {
                      destroy: function() {
                        node.removeEventListener(type, callback);
                      }
                    };
                  }
                  function listenNodeList(nodeList, type, callback) {
                    Array.prototype.forEach.call(nodeList, function(node) {
                      node.addEventListener(type, callback);
                    });
                    return {
                      destroy: function() {
                        Array.prototype.forEach.call(nodeList, function(node) {
                          node.removeEventListener(type, callback);
                        });
                      }
                    };
                  }
                  function listenSelector(selector, type, callback) {
                    return delegate(document.body, selector, type, callback);
                  }
                  module2.exports = listen;
                }
              ),
              /***/
              817: (
                /***/
                function(module2) {
                  function select(element) {
                    var selectedText;
                    if (element.nodeName === "SELECT") {
                      element.focus();
                      selectedText = element.value;
                    } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                      var isReadOnly = element.hasAttribute("readonly");
                      if (!isReadOnly) {
                        element.setAttribute("readonly", "");
                      }
                      element.select();
                      element.setSelectionRange(0, element.value.length);
                      if (!isReadOnly) {
                        element.removeAttribute("readonly");
                      }
                      selectedText = element.value;
                    } else {
                      if (element.hasAttribute("contenteditable")) {
                        element.focus();
                      }
                      var selection = window.getSelection();
                      var range = document.createRange();
                      range.selectNodeContents(element);
                      selection.removeAllRanges();
                      selection.addRange(range);
                      selectedText = selection.toString();
                    }
                    return selectedText;
                  }
                  module2.exports = select;
                }
              ),
              /***/
              279: (
                /***/
                function(module2) {
                  function E() {
                  }
                  E.prototype = {
                    on: function(name, callback, ctx) {
                      var e = this.e || (this.e = {});
                      (e[name] || (e[name] = [])).push({
                        fn: callback,
                        ctx
                      });
                      return this;
                    },
                    once: function(name, callback, ctx) {
                      var self = this;
                      function listener() {
                        self.off(name, listener);
                        callback.apply(ctx, arguments);
                      }
                      ;
                      listener._ = callback;
                      return this.on(name, listener, ctx);
                    },
                    emit: function(name) {
                      var data = [].slice.call(arguments, 1);
                      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                      var i = 0;
                      var len = evtArr.length;
                      for (i; i < len; i++) {
                        evtArr[i].fn.apply(evtArr[i].ctx, data);
                      }
                      return this;
                    },
                    off: function(name, callback) {
                      var e = this.e || (this.e = {});
                      var evts = e[name];
                      var liveEvents = [];
                      if (evts && callback) {
                        for (var i = 0, len = evts.length; i < len; i++) {
                          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                            liveEvents.push(evts[i]);
                        }
                      }
                      liveEvents.length ? e[name] = liveEvents : delete e[name];
                      return this;
                    }
                  };
                  module2.exports = E;
                  module2.exports.TinyEmitter = E;
                }
              )
              /******/
            };
            var __webpack_module_cache__ = {};
            function __webpack_require__(moduleId) {
              if (__webpack_module_cache__[moduleId]) {
                return __webpack_module_cache__[moduleId].exports;
              }
              var module2 = __webpack_module_cache__[moduleId] = {
                /******/
                // no module.id needed
                /******/
                // no module.loaded needed
                /******/
                exports: {}
                /******/
              };
              __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
              return module2.exports;
            }
            !function() {
              __webpack_require__.n = function(module2) {
                var getter = module2 && module2.__esModule ? (
                  /******/
                  function() {
                    return module2["default"];
                  }
                ) : (
                  /******/
                  function() {
                    return module2;
                  }
                );
                __webpack_require__.d(getter, { a: getter });
                return getter;
              };
            }();
            !function() {
              __webpack_require__.d = function(exports2, definition) {
                for (var key in definition) {
                  if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                    Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                  }
                }
              };
            }();
            !function() {
              __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
              };
            }();
            return __webpack_require__(686);
          }().default
        );
      });
    }
  });

  // node_modules/govuk-frontend/dist/govuk/common/index.mjs
  function mergeConfigs(...configObjects) {
    function flattenObject(configObject) {
      const flattenedObject = {};
      function flattenLoop(obj, prefix) {
        for (const [key, value] of Object.entries(obj)) {
          const prefixedKey = prefix ? `${prefix}.${key}` : key;
          if (value && typeof value === "object") {
            flattenLoop(value, prefixedKey);
          } else {
            flattenedObject[prefixedKey] = value;
          }
        }
      }
      flattenLoop(configObject);
      return flattenedObject;
    }
    const formattedConfigObject = {};
    for (const configObject of configObjects) {
      const obj = flattenObject(configObject);
      for (const [key, value] of Object.entries(obj)) {
        formattedConfigObject[key] = value;
      }
    }
    return formattedConfigObject;
  }
  function extractConfigByNamespace(configObject, namespace) {
    const newObject = {};
    for (const [key, value] of Object.entries(configObject)) {
      const keyParts = key.split(".");
      if (keyParts[0] === namespace) {
        if (keyParts.length > 1) {
          keyParts.shift();
        }
        const newKey = keyParts.join(".");
        newObject[newKey] = value;
      }
    }
    return newObject;
  }
  function getFragmentFromUrl(url) {
    if (!url.includes("#")) {
      return void 0;
    }
    return url.split("#").pop();
  }
  function getBreakpoint(name) {
    const property = `--govuk-frontend-breakpoint-${name}`;
    const value = window.getComputedStyle(document.documentElement).getPropertyValue(property);
    return {
      property,
      value: value || void 0
    };
  }
  function setFocus($element, options = {}) {
    var _options$onBeforeFocu;
    const isFocusable = $element.getAttribute("tabindex");
    if (!isFocusable) {
      $element.setAttribute("tabindex", "-1");
    }
    function onFocus() {
      $element.addEventListener("blur", onBlur, {
        once: true
      });
    }
    function onBlur() {
      var _options$onBlur;
      (_options$onBlur = options.onBlur) == null || _options$onBlur.call($element);
      if (!isFocusable) {
        $element.removeAttribute("tabindex");
      }
    }
    $element.addEventListener("focus", onFocus, {
      once: true
    });
    (_options$onBeforeFocu = options.onBeforeFocus) == null || _options$onBeforeFocu.call($element);
    $element.focus();
  }
  function isSupported($scope = document.body) {
    if (!$scope) {
      return false;
    }
    return $scope.classList.contains("govuk-frontend-supported");
  }
  function validateConfig(schema, config) {
    const validationErrors = [];
    for (const [name, conditions] of Object.entries(schema)) {
      const errors = [];
      for (const {
        required,
        errorMessage
      } of conditions) {
        if (!required.every((key) => !!config[key])) {
          errors.push(errorMessage);
        }
      }
      if (name === "anyOf" && !(conditions.length - errors.length >= 1)) {
        validationErrors.push(...errors);
      }
    }
    return validationErrors;
  }

  // node_modules/govuk-frontend/dist/govuk/common/normalise-dataset.mjs
  function normaliseString(value) {
    if (typeof value !== "string") {
      return value;
    }
    const trimmedValue = value.trim();
    if (trimmedValue === "true") {
      return true;
    }
    if (trimmedValue === "false") {
      return false;
    }
    if (trimmedValue.length > 0 && isFinite(Number(trimmedValue))) {
      return Number(trimmedValue);
    }
    return value;
  }
  function normaliseDataset(dataset) {
    const out = {};
    for (const [key, value] of Object.entries(dataset)) {
      out[key] = normaliseString(value);
    }
    return out;
  }

  // node_modules/govuk-frontend/dist/govuk/errors/index.mjs
  var GOVUKFrontendError = class extends Error {
    constructor(...args) {
      super(...args);
      this.name = "GOVUKFrontendError";
    }
  };
  var SupportError = class extends GOVUKFrontendError {
    /**
     * Checks if GOV.UK Frontend is supported on this page
     *
     * @param {HTMLElement | null} [$scope] - HTML element `<body>` checked for browser support
     */
    constructor($scope = document.body) {
      const supportMessage = "noModule" in HTMLScriptElement.prototype ? 'GOV.UK Frontend initialised without `<body class="govuk-frontend-supported">` from template `<script>` snippet' : "GOV.UK Frontend is not supported in this browser";
      super($scope ? supportMessage : 'GOV.UK Frontend initialised without `<script type="module">`');
      this.name = "SupportError";
    }
  };
  var ConfigError = class extends GOVUKFrontendError {
    constructor(...args) {
      super(...args);
      this.name = "ConfigError";
    }
  };
  var ElementError = class extends GOVUKFrontendError {
    constructor(messageOrOptions) {
      let message = typeof messageOrOptions === "string" ? messageOrOptions : "";
      if (typeof messageOrOptions === "object") {
        const {
          componentName,
          identifier,
          element,
          expectedType
        } = messageOrOptions;
        message = `${componentName}: ${identifier}`;
        message += element ? ` is not of type ${expectedType != null ? expectedType : "HTMLElement"}` : " not found";
      }
      super(message);
      this.name = "ElementError";
    }
  };

  // node_modules/govuk-frontend/dist/govuk/govuk-frontend-component.mjs
  var GOVUKFrontendComponent = class {
    constructor() {
      this.checkSupport();
    }
    checkSupport() {
      if (!isSupported()) {
        throw new SupportError();
      }
    }
  };

  // node_modules/govuk-frontend/dist/govuk/i18n.mjs
  var I18n = class _I18n {
    constructor(translations = {}, config = {}) {
      var _config$locale;
      this.translations = void 0;
      this.locale = void 0;
      this.translations = translations;
      this.locale = (_config$locale = config.locale) != null ? _config$locale : document.documentElement.lang || "en";
    }
    t(lookupKey, options) {
      if (!lookupKey) {
        throw new Error("i18n: lookup key missing");
      }
      if (typeof (options == null ? void 0 : options.count) === "number") {
        lookupKey = `${lookupKey}.${this.getPluralSuffix(lookupKey, options.count)}`;
      }
      const translationString = this.translations[lookupKey];
      if (typeof translationString === "string") {
        if (translationString.match(/%{(.\S+)}/)) {
          if (!options) {
            throw new Error("i18n: cannot replace placeholders in string if no option data provided");
          }
          return this.replacePlaceholders(translationString, options);
        }
        return translationString;
      }
      return lookupKey;
    }
    replacePlaceholders(translationString, options) {
      const formatter = Intl.NumberFormat.supportedLocalesOf(this.locale).length ? new Intl.NumberFormat(this.locale) : void 0;
      return translationString.replace(/%{(.\S+)}/g, function(placeholderWithBraces, placeholderKey) {
        if (Object.prototype.hasOwnProperty.call(options, placeholderKey)) {
          const placeholderValue = options[placeholderKey];
          if (placeholderValue === false || typeof placeholderValue !== "number" && typeof placeholderValue !== "string") {
            return "";
          }
          if (typeof placeholderValue === "number") {
            return formatter ? formatter.format(placeholderValue) : `${placeholderValue}`;
          }
          return placeholderValue;
        }
        throw new Error(`i18n: no data found to replace ${placeholderWithBraces} placeholder in string`);
      });
    }
    hasIntlPluralRulesSupport() {
      return Boolean("PluralRules" in window.Intl && Intl.PluralRules.supportedLocalesOf(this.locale).length);
    }
    getPluralSuffix(lookupKey, count) {
      count = Number(count);
      if (!isFinite(count)) {
        return "other";
      }
      const preferredForm = this.hasIntlPluralRulesSupport() ? new Intl.PluralRules(this.locale).select(count) : this.selectPluralFormUsingFallbackRules(count);
      if (`${lookupKey}.${preferredForm}` in this.translations) {
        return preferredForm;
      } else if (`${lookupKey}.other` in this.translations) {
        console.warn(`i18n: Missing plural form ".${preferredForm}" for "${this.locale}" locale. Falling back to ".other".`);
        return "other";
      }
      throw new Error(`i18n: Plural form ".other" is required for "${this.locale}" locale`);
    }
    selectPluralFormUsingFallbackRules(count) {
      count = Math.abs(Math.floor(count));
      const ruleset = this.getPluralRulesForLocale();
      if (ruleset) {
        return _I18n.pluralRules[ruleset](count);
      }
      return "other";
    }
    getPluralRulesForLocale() {
      const localeShort = this.locale.split("-")[0];
      for (const pluralRule in _I18n.pluralRulesMap) {
        const languages = _I18n.pluralRulesMap[pluralRule];
        if (languages.includes(this.locale) || languages.includes(localeShort)) {
          return pluralRule;
        }
      }
    }
  };
  I18n.pluralRulesMap = {
    arabic: ["ar"],
    chinese: ["my", "zh", "id", "ja", "jv", "ko", "ms", "th", "vi"],
    french: ["hy", "bn", "fr", "gu", "hi", "fa", "pa", "zu"],
    german: ["af", "sq", "az", "eu", "bg", "ca", "da", "nl", "en", "et", "fi", "ka", "de", "el", "hu", "lb", "no", "so", "sw", "sv", "ta", "te", "tr", "ur"],
    irish: ["ga"],
    russian: ["ru", "uk"],
    scottish: ["gd"],
    spanish: ["pt-PT", "it", "es"],
    welsh: ["cy"]
  };
  I18n.pluralRules = {
    arabic(n) {
      if (n === 0) {
        return "zero";
      }
      if (n === 1) {
        return "one";
      }
      if (n === 2) {
        return "two";
      }
      if (n % 100 >= 3 && n % 100 <= 10) {
        return "few";
      }
      if (n % 100 >= 11 && n % 100 <= 99) {
        return "many";
      }
      return "other";
    },
    chinese() {
      return "other";
    },
    french(n) {
      return n === 0 || n === 1 ? "one" : "other";
    },
    german(n) {
      return n === 1 ? "one" : "other";
    },
    irish(n) {
      if (n === 1) {
        return "one";
      }
      if (n === 2) {
        return "two";
      }
      if (n >= 3 && n <= 6) {
        return "few";
      }
      if (n >= 7 && n <= 10) {
        return "many";
      }
      return "other";
    },
    russian(n) {
      const lastTwo = n % 100;
      const last = lastTwo % 10;
      if (last === 1 && lastTwo !== 11) {
        return "one";
      }
      if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
        return "few";
      }
      if (last === 0 || last >= 5 && last <= 9 || lastTwo >= 11 && lastTwo <= 14) {
        return "many";
      }
      return "other";
    },
    scottish(n) {
      if (n === 1 || n === 11) {
        return "one";
      }
      if (n === 2 || n === 12) {
        return "two";
      }
      if (n >= 3 && n <= 10 || n >= 13 && n <= 19) {
        return "few";
      }
      return "other";
    },
    spanish(n) {
      if (n === 1) {
        return "one";
      }
      if (n % 1e6 === 0 && n !== 0) {
        return "many";
      }
      return "other";
    },
    welsh(n) {
      if (n === 0) {
        return "zero";
      }
      if (n === 1) {
        return "one";
      }
      if (n === 2) {
        return "two";
      }
      if (n === 3) {
        return "few";
      }
      if (n === 6) {
        return "many";
      }
      return "other";
    }
  };

  // node_modules/govuk-frontend/dist/govuk/components/accordion/accordion.mjs
  var Accordion = class _Accordion extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element to use for accordion
     * @param {AccordionConfig} [config] - Accordion config
     */
    constructor($module, config = {}) {
      super();
      this.$module = void 0;
      this.config = void 0;
      this.i18n = void 0;
      this.controlsClass = "govuk-accordion__controls";
      this.showAllClass = "govuk-accordion__show-all";
      this.showAllTextClass = "govuk-accordion__show-all-text";
      this.sectionClass = "govuk-accordion__section";
      this.sectionExpandedClass = "govuk-accordion__section--expanded";
      this.sectionButtonClass = "govuk-accordion__section-button";
      this.sectionHeaderClass = "govuk-accordion__section-header";
      this.sectionHeadingClass = "govuk-accordion__section-heading";
      this.sectionHeadingDividerClass = "govuk-accordion__section-heading-divider";
      this.sectionHeadingTextClass = "govuk-accordion__section-heading-text";
      this.sectionHeadingTextFocusClass = "govuk-accordion__section-heading-text-focus";
      this.sectionShowHideToggleClass = "govuk-accordion__section-toggle";
      this.sectionShowHideToggleFocusClass = "govuk-accordion__section-toggle-focus";
      this.sectionShowHideTextClass = "govuk-accordion__section-toggle-text";
      this.upChevronIconClass = "govuk-accordion-nav__chevron";
      this.downChevronIconClass = "govuk-accordion-nav__chevron--down";
      this.sectionSummaryClass = "govuk-accordion__section-summary";
      this.sectionSummaryFocusClass = "govuk-accordion__section-summary-focus";
      this.sectionContentClass = "govuk-accordion__section-content";
      this.$sections = void 0;
      this.browserSupportsSessionStorage = false;
      this.$showAllButton = null;
      this.$showAllIcon = null;
      this.$showAllText = null;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Accordion",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      this.$module = $module;
      this.config = mergeConfigs(_Accordion.defaults, config, normaliseDataset($module.dataset));
      this.i18n = new I18n(extractConfigByNamespace(this.config, "i18n"));
      const $sections = this.$module.querySelectorAll(`.${this.sectionClass}`);
      if (!$sections.length) {
        throw new ElementError({
          componentName: "Accordion",
          identifier: `Sections (\`<div class="${this.sectionClass}">\`)`
        });
      }
      this.$sections = $sections;
      this.browserSupportsSessionStorage = helper.checkForSessionStorage();
      this.initControls();
      this.initSectionHeaders();
      const areAllSectionsOpen = this.checkIfAllSectionsOpen();
      this.updateShowAllButton(areAllSectionsOpen);
    }
    initControls() {
      this.$showAllButton = document.createElement("button");
      this.$showAllButton.setAttribute("type", "button");
      this.$showAllButton.setAttribute("class", this.showAllClass);
      this.$showAllButton.setAttribute("aria-expanded", "false");
      this.$showAllIcon = document.createElement("span");
      this.$showAllIcon.classList.add(this.upChevronIconClass);
      this.$showAllButton.appendChild(this.$showAllIcon);
      const $accordionControls = document.createElement("div");
      $accordionControls.setAttribute("class", this.controlsClass);
      $accordionControls.appendChild(this.$showAllButton);
      this.$module.insertBefore($accordionControls, this.$module.firstChild);
      this.$showAllText = document.createElement("span");
      this.$showAllText.classList.add(this.showAllTextClass);
      this.$showAllButton.appendChild(this.$showAllText);
      this.$showAllButton.addEventListener("click", () => this.onShowOrHideAllToggle());
      if ("onbeforematch" in document) {
        document.addEventListener("beforematch", (event) => this.onBeforeMatch(event));
      }
    }
    initSectionHeaders() {
      this.$sections.forEach(($section, i) => {
        const $header = $section.querySelector(`.${this.sectionHeaderClass}`);
        if (!$header) {
          throw new ElementError({
            componentName: "Accordion",
            identifier: `Section headers (\`<div class="${this.sectionHeaderClass}">\`)`
          });
        }
        this.constructHeaderMarkup($header, i);
        this.setExpanded(this.isExpanded($section), $section);
        $header.addEventListener("click", () => this.onSectionToggle($section));
        this.setInitialState($section);
      });
    }
    constructHeaderMarkup($header, index) {
      const $span = $header.querySelector(`.${this.sectionButtonClass}`);
      const $heading = $header.querySelector(`.${this.sectionHeadingClass}`);
      const $summary = $header.querySelector(`.${this.sectionSummaryClass}`);
      if (!$heading) {
        throw new ElementError({
          componentName: "Accordion",
          identifier: `Section heading (\`.${this.sectionHeadingClass}\`)`
        });
      }
      if (!$span) {
        throw new ElementError({
          componentName: "Accordion",
          identifier: `Section button placeholder (\`<span class="${this.sectionButtonClass}">\`)`
        });
      }
      const $button = document.createElement("button");
      $button.setAttribute("type", "button");
      $button.setAttribute("aria-controls", `${this.$module.id}-content-${index + 1}`);
      for (const attr of Array.from($span.attributes)) {
        if (attr.nodeName !== "id") {
          $button.setAttribute(attr.nodeName, `${attr.nodeValue}`);
        }
      }
      const $headingText = document.createElement("span");
      $headingText.classList.add(this.sectionHeadingTextClass);
      $headingText.id = $span.id;
      const $headingTextFocus = document.createElement("span");
      $headingTextFocus.classList.add(this.sectionHeadingTextFocusClass);
      $headingText.appendChild($headingTextFocus);
      $headingTextFocus.innerHTML = $span.innerHTML;
      const $showHideToggle = document.createElement("span");
      $showHideToggle.classList.add(this.sectionShowHideToggleClass);
      $showHideToggle.setAttribute("data-nosnippet", "");
      const $showHideToggleFocus = document.createElement("span");
      $showHideToggleFocus.classList.add(this.sectionShowHideToggleFocusClass);
      $showHideToggle.appendChild($showHideToggleFocus);
      const $showHideText = document.createElement("span");
      const $showHideIcon = document.createElement("span");
      $showHideIcon.classList.add(this.upChevronIconClass);
      $showHideToggleFocus.appendChild($showHideIcon);
      $showHideText.classList.add(this.sectionShowHideTextClass);
      $showHideToggleFocus.appendChild($showHideText);
      $button.appendChild($headingText);
      $button.appendChild(this.getButtonPunctuationEl());
      if ($summary != null && $summary.parentNode) {
        const $summarySpan = document.createElement("span");
        const $summarySpanFocus = document.createElement("span");
        $summarySpanFocus.classList.add(this.sectionSummaryFocusClass);
        $summarySpan.appendChild($summarySpanFocus);
        for (const attr of Array.from($summary.attributes)) {
          $summarySpan.setAttribute(attr.nodeName, `${attr.nodeValue}`);
        }
        $summarySpanFocus.innerHTML = $summary.innerHTML;
        $summary.parentNode.replaceChild($summarySpan, $summary);
        $button.appendChild($summarySpan);
        $button.appendChild(this.getButtonPunctuationEl());
      }
      $button.appendChild($showHideToggle);
      $heading.removeChild($span);
      $heading.appendChild($button);
    }
    onBeforeMatch(event) {
      const $fragment = event.target;
      if (!($fragment instanceof Element)) {
        return;
      }
      const $section = $fragment.closest(`.${this.sectionClass}`);
      if ($section) {
        this.setExpanded(true, $section);
      }
    }
    onSectionToggle($section) {
      const expanded = this.isExpanded($section);
      this.setExpanded(!expanded, $section);
      this.storeState($section);
    }
    onShowOrHideAllToggle() {
      const nowExpanded = !this.checkIfAllSectionsOpen();
      this.$sections.forEach(($section) => {
        this.setExpanded(nowExpanded, $section);
        this.storeState($section);
      });
      this.updateShowAllButton(nowExpanded);
    }
    setExpanded(expanded, $section) {
      const $showHideIcon = $section.querySelector(`.${this.upChevronIconClass}`);
      const $showHideText = $section.querySelector(`.${this.sectionShowHideTextClass}`);
      const $button = $section.querySelector(`.${this.sectionButtonClass}`);
      const $content = $section.querySelector(`.${this.sectionContentClass}`);
      if (!$content) {
        throw new ElementError({
          componentName: "Accordion",
          identifier: `Section content (\`<div class="${this.sectionContentClass}">\`)`
        });
      }
      if (!$showHideIcon || !$showHideText || !$button) {
        return;
      }
      const newButtonText = expanded ? this.i18n.t("hideSection") : this.i18n.t("showSection");
      $showHideText.textContent = newButtonText;
      $button.setAttribute("aria-expanded", `${expanded}`);
      const ariaLabelParts = [];
      const $headingText = $section.querySelector(`.${this.sectionHeadingTextClass}`);
      if ($headingText) {
        ariaLabelParts.push(`${$headingText.textContent}`.trim());
      }
      const $summary = $section.querySelector(`.${this.sectionSummaryClass}`);
      if ($summary) {
        ariaLabelParts.push(`${$summary.textContent}`.trim());
      }
      const ariaLabelMessage = expanded ? this.i18n.t("hideSectionAriaLabel") : this.i18n.t("showSectionAriaLabel");
      ariaLabelParts.push(ariaLabelMessage);
      $button.setAttribute("aria-label", ariaLabelParts.join(" , "));
      if (expanded) {
        $content.removeAttribute("hidden");
        $section.classList.add(this.sectionExpandedClass);
        $showHideIcon.classList.remove(this.downChevronIconClass);
      } else {
        $content.setAttribute("hidden", "until-found");
        $section.classList.remove(this.sectionExpandedClass);
        $showHideIcon.classList.add(this.downChevronIconClass);
      }
      const areAllSectionsOpen = this.checkIfAllSectionsOpen();
      this.updateShowAllButton(areAllSectionsOpen);
    }
    isExpanded($section) {
      return $section.classList.contains(this.sectionExpandedClass);
    }
    checkIfAllSectionsOpen() {
      const sectionsCount = this.$sections.length;
      const expandedSectionCount = this.$module.querySelectorAll(`.${this.sectionExpandedClass}`).length;
      const areAllSectionsOpen = sectionsCount === expandedSectionCount;
      return areAllSectionsOpen;
    }
    updateShowAllButton(expanded) {
      if (!this.$showAllButton || !this.$showAllText || !this.$showAllIcon) {
        return;
      }
      this.$showAllButton.setAttribute("aria-expanded", expanded.toString());
      this.$showAllText.textContent = expanded ? this.i18n.t("hideAllSections") : this.i18n.t("showAllSections");
      this.$showAllIcon.classList.toggle(this.downChevronIconClass, !expanded);
    }
    storeState($section) {
      if (this.browserSupportsSessionStorage && this.config.rememberExpanded) {
        const $button = $section.querySelector(`.${this.sectionButtonClass}`);
        if ($button) {
          const contentId = $button.getAttribute("aria-controls");
          const contentState = $button.getAttribute("aria-expanded");
          if (contentId && contentState) {
            window.sessionStorage.setItem(contentId, contentState);
          }
        }
      }
    }
    setInitialState($section) {
      if (this.browserSupportsSessionStorage && this.config.rememberExpanded) {
        const $button = $section.querySelector(`.${this.sectionButtonClass}`);
        if ($button) {
          const contentId = $button.getAttribute("aria-controls");
          const contentState = contentId ? window.sessionStorage.getItem(contentId) : null;
          if (contentState !== null) {
            this.setExpanded(contentState === "true", $section);
          }
        }
      }
    }
    getButtonPunctuationEl() {
      const $punctuationEl = document.createElement("span");
      $punctuationEl.classList.add("govuk-visually-hidden", this.sectionHeadingDividerClass);
      $punctuationEl.innerHTML = ", ";
      return $punctuationEl;
    }
  };
  Accordion.moduleName = "govuk-accordion";
  Accordion.defaults = Object.freeze({
    i18n: {
      hideAllSections: "Hide all sections",
      hideSection: "Hide",
      hideSectionAriaLabel: "Hide this section",
      showAllSections: "Show all sections",
      showSection: "Show",
      showSectionAriaLabel: "Show this section"
    },
    rememberExpanded: true
  });
  var helper = {
    /**
     * Check for `window.sessionStorage`, and that it actually works.
     *
     * @returns {boolean} True if session storage is available
     */
    checkForSessionStorage: function() {
      const testString = "this is the test string";
      let result;
      try {
        window.sessionStorage.setItem(testString, testString);
        result = window.sessionStorage.getItem(testString) === testString.toString();
        window.sessionStorage.removeItem(testString);
        return result;
      } catch (exception) {
        return false;
      }
    }
  };

  // node_modules/govuk-frontend/dist/govuk/components/button/button.mjs
  var KEY_SPACE = 32;
  var DEBOUNCE_TIMEOUT_IN_SECONDS = 1;
  var Button = class _Button extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element to use for button
     * @param {ButtonConfig} [config] - Button config
     */
    constructor($module, config = {}) {
      super();
      this.$module = void 0;
      this.config = void 0;
      this.debounceFormSubmitTimer = null;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Button",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      this.$module = $module;
      this.config = mergeConfigs(_Button.defaults, config, normaliseDataset($module.dataset));
      this.$module.addEventListener("keydown", (event) => this.handleKeyDown(event));
      this.$module.addEventListener("click", (event) => this.debounce(event));
    }
    handleKeyDown(event) {
      const $target = event.target;
      if (event.keyCode !== KEY_SPACE) {
        return;
      }
      if ($target instanceof HTMLElement && $target.getAttribute("role") === "button") {
        event.preventDefault();
        $target.click();
      }
    }
    debounce(event) {
      if (!this.config.preventDoubleClick) {
        return;
      }
      if (this.debounceFormSubmitTimer) {
        event.preventDefault();
        return false;
      }
      this.debounceFormSubmitTimer = window.setTimeout(() => {
        this.debounceFormSubmitTimer = null;
      }, DEBOUNCE_TIMEOUT_IN_SECONDS * 1e3);
    }
  };
  Button.moduleName = "govuk-button";
  Button.defaults = Object.freeze({
    preventDoubleClick: false
  });

  // node_modules/govuk-frontend/dist/govuk/common/closest-attribute-value.mjs
  function closestAttributeValue($element, attributeName) {
    const $closestElementWithAttribute = $element.closest(`[${attributeName}]`);
    return $closestElementWithAttribute ? $closestElementWithAttribute.getAttribute(attributeName) : null;
  }

  // node_modules/govuk-frontend/dist/govuk/components/character-count/character-count.mjs
  var CharacterCount = class _CharacterCount extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element to use for character count
     * @param {CharacterCountConfig} [config] - Character count config
     */
    constructor($module, config = {}) {
      var _ref, _this$config$maxwords;
      super();
      this.$module = void 0;
      this.$textarea = void 0;
      this.$visibleCountMessage = void 0;
      this.$screenReaderCountMessage = void 0;
      this.lastInputTimestamp = null;
      this.lastInputValue = "";
      this.valueChecker = null;
      this.config = void 0;
      this.i18n = void 0;
      this.maxLength = void 0;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Character count",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      const $textarea = $module.querySelector(".govuk-js-character-count");
      if (!($textarea instanceof HTMLTextAreaElement || $textarea instanceof HTMLInputElement)) {
        throw new ElementError({
          componentName: "Character count",
          element: $textarea,
          expectedType: "HTMLTextareaElement or HTMLInputElement",
          identifier: "Form field (`.govuk-js-character-count`)"
        });
      }
      const datasetConfig = normaliseDataset($module.dataset);
      let configOverrides = {};
      if ("maxwords" in datasetConfig || "maxlength" in datasetConfig) {
        configOverrides = {
          maxlength: void 0,
          maxwords: void 0
        };
      }
      this.config = mergeConfigs(_CharacterCount.defaults, config, configOverrides, datasetConfig);
      const errors = validateConfig(_CharacterCount.schema, this.config);
      if (errors[0]) {
        throw new ConfigError(`Character count: ${errors[0]}`);
      }
      this.i18n = new I18n(extractConfigByNamespace(this.config, "i18n"), {
        locale: closestAttributeValue($module, "lang")
      });
      this.maxLength = (_ref = (_this$config$maxwords = this.config.maxwords) != null ? _this$config$maxwords : this.config.maxlength) != null ? _ref : Infinity;
      this.$module = $module;
      this.$textarea = $textarea;
      const textareaDescriptionId = `${this.$textarea.id}-info`;
      const $textareaDescription = document.getElementById(textareaDescriptionId);
      if (!$textareaDescription) {
        throw new ElementError({
          componentName: "Character count",
          element: $textareaDescription,
          identifier: `Count message (\`id="${textareaDescriptionId}"\`)`
        });
      }
      if (`${$textareaDescription.textContent}`.match(/^\s*$/)) {
        $textareaDescription.textContent = this.i18n.t("textareaDescription", {
          count: this.maxLength
        });
      }
      this.$textarea.insertAdjacentElement("afterend", $textareaDescription);
      const $screenReaderCountMessage = document.createElement("div");
      $screenReaderCountMessage.className = "govuk-character-count__sr-status govuk-visually-hidden";
      $screenReaderCountMessage.setAttribute("aria-live", "polite");
      this.$screenReaderCountMessage = $screenReaderCountMessage;
      $textareaDescription.insertAdjacentElement("afterend", $screenReaderCountMessage);
      const $visibleCountMessage = document.createElement("div");
      $visibleCountMessage.className = $textareaDescription.className;
      $visibleCountMessage.classList.add("govuk-character-count__status");
      $visibleCountMessage.setAttribute("aria-hidden", "true");
      this.$visibleCountMessage = $visibleCountMessage;
      $textareaDescription.insertAdjacentElement("afterend", $visibleCountMessage);
      $textareaDescription.classList.add("govuk-visually-hidden");
      this.$textarea.removeAttribute("maxlength");
      this.bindChangeEvents();
      window.addEventListener("pageshow", () => this.updateCountMessage());
      this.updateCountMessage();
    }
    bindChangeEvents() {
      this.$textarea.addEventListener("keyup", () => this.handleKeyUp());
      this.$textarea.addEventListener("focus", () => this.handleFocus());
      this.$textarea.addEventListener("blur", () => this.handleBlur());
    }
    handleKeyUp() {
      this.updateVisibleCountMessage();
      this.lastInputTimestamp = Date.now();
    }
    handleFocus() {
      this.valueChecker = window.setInterval(() => {
        if (!this.lastInputTimestamp || Date.now() - 500 >= this.lastInputTimestamp) {
          this.updateIfValueChanged();
        }
      }, 1e3);
    }
    handleBlur() {
      if (this.valueChecker) {
        window.clearInterval(this.valueChecker);
      }
    }
    updateIfValueChanged() {
      if (this.$textarea.value !== this.lastInputValue) {
        this.lastInputValue = this.$textarea.value;
        this.updateCountMessage();
      }
    }
    updateCountMessage() {
      this.updateVisibleCountMessage();
      this.updateScreenReaderCountMessage();
    }
    updateVisibleCountMessage() {
      const remainingNumber = this.maxLength - this.count(this.$textarea.value);
      const isError = remainingNumber < 0;
      this.$visibleCountMessage.classList.toggle("govuk-character-count__message--disabled", !this.isOverThreshold());
      this.$textarea.classList.toggle("govuk-textarea--error", isError);
      this.$visibleCountMessage.classList.toggle("govuk-error-message", isError);
      this.$visibleCountMessage.classList.toggle("govuk-hint", !isError);
      this.$visibleCountMessage.textContent = this.getCountMessage();
    }
    updateScreenReaderCountMessage() {
      if (this.isOverThreshold()) {
        this.$screenReaderCountMessage.removeAttribute("aria-hidden");
      } else {
        this.$screenReaderCountMessage.setAttribute("aria-hidden", "true");
      }
      this.$screenReaderCountMessage.textContent = this.getCountMessage();
    }
    count(text) {
      if (this.config.maxwords) {
        var _text$match;
        const tokens = (_text$match = text.match(/\S+/g)) != null ? _text$match : [];
        return tokens.length;
      }
      return text.length;
    }
    getCountMessage() {
      const remainingNumber = this.maxLength - this.count(this.$textarea.value);
      const countType = this.config.maxwords ? "words" : "characters";
      return this.formatCountMessage(remainingNumber, countType);
    }
    formatCountMessage(remainingNumber, countType) {
      if (remainingNumber === 0) {
        return this.i18n.t(`${countType}AtLimit`);
      }
      const translationKeySuffix = remainingNumber < 0 ? "OverLimit" : "UnderLimit";
      return this.i18n.t(`${countType}${translationKeySuffix}`, {
        count: Math.abs(remainingNumber)
      });
    }
    isOverThreshold() {
      if (!this.config.threshold) {
        return true;
      }
      const currentLength = this.count(this.$textarea.value);
      const maxLength = this.maxLength;
      const thresholdValue = maxLength * this.config.threshold / 100;
      return thresholdValue <= currentLength;
    }
  };
  CharacterCount.moduleName = "govuk-character-count";
  CharacterCount.defaults = Object.freeze({
    threshold: 0,
    i18n: {
      charactersUnderLimit: {
        one: "You have %{count} character remaining",
        other: "You have %{count} characters remaining"
      },
      charactersAtLimit: "You have 0 characters remaining",
      charactersOverLimit: {
        one: "You have %{count} character too many",
        other: "You have %{count} characters too many"
      },
      wordsUnderLimit: {
        one: "You have %{count} word remaining",
        other: "You have %{count} words remaining"
      },
      wordsAtLimit: "You have 0 words remaining",
      wordsOverLimit: {
        one: "You have %{count} word too many",
        other: "You have %{count} words too many"
      },
      textareaDescription: {
        other: ""
      }
    }
  });
  CharacterCount.schema = Object.freeze({
    anyOf: [{
      required: ["maxwords"],
      errorMessage: 'Either "maxlength" or "maxwords" must be provided'
    }, {
      required: ["maxlength"],
      errorMessage: 'Either "maxlength" or "maxwords" must be provided'
    }]
  });

  // node_modules/govuk-frontend/dist/govuk/components/checkboxes/checkboxes.mjs
  var Checkboxes = class extends GOVUKFrontendComponent {
    /**
     * Checkboxes can be associated with a 'conditionally revealed' content block
     * – for example, a checkbox for 'Phone' could reveal an additional form field
     * for the user to enter their phone number.
     *
     * These associations are made using a `data-aria-controls` attribute, which
     * is promoted to an aria-controls attribute during initialisation.
     *
     * We also need to restore the state of any conditional reveals on the page
     * (for example if the user has navigated back), and set up event handlers to
     * keep the reveal in sync with the checkbox state.
     *
     * @param {Element | null} $module - HTML element to use for checkboxes
     */
    constructor($module) {
      super();
      this.$module = void 0;
      this.$inputs = void 0;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Checkboxes",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      const $inputs = $module.querySelectorAll('input[type="checkbox"]');
      if (!$inputs.length) {
        throw new ElementError({
          componentName: "Checkboxes",
          identifier: 'Form inputs (`<input type="checkbox">`)'
        });
      }
      this.$module = $module;
      this.$inputs = $inputs;
      this.$inputs.forEach(($input) => {
        const targetId = $input.getAttribute("data-aria-controls");
        if (!targetId) {
          return;
        }
        if (!document.getElementById(targetId)) {
          throw new ElementError({
            componentName: "Checkboxes",
            identifier: `Conditional reveal (\`id="${targetId}"\`)`
          });
        }
        $input.setAttribute("aria-controls", targetId);
        $input.removeAttribute("data-aria-controls");
      });
      window.addEventListener("pageshow", () => this.syncAllConditionalReveals());
      this.syncAllConditionalReveals();
      this.$module.addEventListener("click", (event) => this.handleClick(event));
    }
    syncAllConditionalReveals() {
      this.$inputs.forEach(($input) => this.syncConditionalRevealWithInputState($input));
    }
    syncConditionalRevealWithInputState($input) {
      const targetId = $input.getAttribute("aria-controls");
      if (!targetId) {
        return;
      }
      const $target = document.getElementById(targetId);
      if ($target && $target.classList.contains("govuk-checkboxes__conditional")) {
        const inputIsChecked = $input.checked;
        $input.setAttribute("aria-expanded", inputIsChecked.toString());
        $target.classList.toggle("govuk-checkboxes__conditional--hidden", !inputIsChecked);
      }
    }
    unCheckAllInputsExcept($input) {
      const allInputsWithSameName = document.querySelectorAll(`input[type="checkbox"][name="${$input.name}"]`);
      allInputsWithSameName.forEach(($inputWithSameName) => {
        const hasSameFormOwner = $input.form === $inputWithSameName.form;
        if (hasSameFormOwner && $inputWithSameName !== $input) {
          $inputWithSameName.checked = false;
          this.syncConditionalRevealWithInputState($inputWithSameName);
        }
      });
    }
    unCheckExclusiveInputs($input) {
      const allInputsWithSameNameAndExclusiveBehaviour = document.querySelectorAll(`input[data-behaviour="exclusive"][type="checkbox"][name="${$input.name}"]`);
      allInputsWithSameNameAndExclusiveBehaviour.forEach(($exclusiveInput) => {
        const hasSameFormOwner = $input.form === $exclusiveInput.form;
        if (hasSameFormOwner) {
          $exclusiveInput.checked = false;
          this.syncConditionalRevealWithInputState($exclusiveInput);
        }
      });
    }
    handleClick(event) {
      const $clickedInput = event.target;
      if (!($clickedInput instanceof HTMLInputElement) || $clickedInput.type !== "checkbox") {
        return;
      }
      const hasAriaControls = $clickedInput.getAttribute("aria-controls");
      if (hasAriaControls) {
        this.syncConditionalRevealWithInputState($clickedInput);
      }
      if (!$clickedInput.checked) {
        return;
      }
      const hasBehaviourExclusive = $clickedInput.getAttribute("data-behaviour") === "exclusive";
      if (hasBehaviourExclusive) {
        this.unCheckAllInputsExcept($clickedInput);
      } else {
        this.unCheckExclusiveInputs($clickedInput);
      }
    }
  };
  Checkboxes.moduleName = "govuk-checkboxes";

  // node_modules/govuk-frontend/dist/govuk/components/error-summary/error-summary.mjs
  var ErrorSummary = class _ErrorSummary extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element to use for error summary
     * @param {ErrorSummaryConfig} [config] - Error summary config
     */
    constructor($module, config = {}) {
      super();
      this.$module = void 0;
      this.config = void 0;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Error summary",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      this.$module = $module;
      this.config = mergeConfigs(_ErrorSummary.defaults, config, normaliseDataset($module.dataset));
      if (!this.config.disableAutoFocus) {
        setFocus(this.$module);
      }
      this.$module.addEventListener("click", (event) => this.handleClick(event));
    }
    handleClick(event) {
      const $target = event.target;
      if ($target && this.focusTarget($target)) {
        event.preventDefault();
      }
    }
    focusTarget($target) {
      if (!($target instanceof HTMLAnchorElement)) {
        return false;
      }
      const inputId = getFragmentFromUrl($target.href);
      if (!inputId) {
        return false;
      }
      const $input = document.getElementById(inputId);
      if (!$input) {
        return false;
      }
      const $legendOrLabel = this.getAssociatedLegendOrLabel($input);
      if (!$legendOrLabel) {
        return false;
      }
      $legendOrLabel.scrollIntoView();
      $input.focus({
        preventScroll: true
      });
      return true;
    }
    getAssociatedLegendOrLabel($input) {
      var _document$querySelect;
      const $fieldset = $input.closest("fieldset");
      if ($fieldset) {
        const $legends = $fieldset.getElementsByTagName("legend");
        if ($legends.length) {
          const $candidateLegend = $legends[0];
          if ($input instanceof HTMLInputElement && ($input.type === "checkbox" || $input.type === "radio")) {
            return $candidateLegend;
          }
          const legendTop = $candidateLegend.getBoundingClientRect().top;
          const inputRect = $input.getBoundingClientRect();
          if (inputRect.height && window.innerHeight) {
            const inputBottom = inputRect.top + inputRect.height;
            if (inputBottom - legendTop < window.innerHeight / 2) {
              return $candidateLegend;
            }
          }
        }
      }
      return (_document$querySelect = document.querySelector(`label[for='${$input.getAttribute("id")}']`)) != null ? _document$querySelect : $input.closest("label");
    }
  };
  ErrorSummary.moduleName = "govuk-error-summary";
  ErrorSummary.defaults = Object.freeze({
    disableAutoFocus: false
  });

  // node_modules/govuk-frontend/dist/govuk/components/exit-this-page/exit-this-page.mjs
  var ExitThisPage = class _ExitThisPage extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element that wraps the Exit This Page button
     * @param {ExitThisPageConfig} [config] - Exit This Page config
     */
    constructor($module, config = {}) {
      super();
      this.$module = void 0;
      this.config = void 0;
      this.i18n = void 0;
      this.$button = void 0;
      this.$skiplinkButton = null;
      this.$updateSpan = null;
      this.$indicatorContainer = null;
      this.$overlay = null;
      this.keypressCounter = 0;
      this.lastKeyWasModified = false;
      this.timeoutTime = 5e3;
      this.keypressTimeoutId = null;
      this.timeoutMessageId = null;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Exit this page",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      const $button = $module.querySelector(".govuk-exit-this-page__button");
      if (!($button instanceof HTMLAnchorElement)) {
        throw new ElementError({
          componentName: "Exit this page",
          element: $button,
          expectedType: "HTMLAnchorElement",
          identifier: "Button (`.govuk-exit-this-page__button`)"
        });
      }
      this.config = mergeConfigs(_ExitThisPage.defaults, config, normaliseDataset($module.dataset));
      this.i18n = new I18n(extractConfigByNamespace(this.config, "i18n"));
      this.$module = $module;
      this.$button = $button;
      const $skiplinkButton = document.querySelector(".govuk-js-exit-this-page-skiplink");
      if ($skiplinkButton instanceof HTMLAnchorElement) {
        this.$skiplinkButton = $skiplinkButton;
      }
      this.buildIndicator();
      this.initUpdateSpan();
      this.initButtonClickHandler();
      if (!("govukFrontendExitThisPageKeypress" in document.body.dataset)) {
        document.addEventListener("keyup", this.handleKeypress.bind(this), true);
        document.body.dataset.govukFrontendExitThisPageKeypress = "true";
      }
      window.addEventListener("pageshow", this.resetPage.bind(this));
    }
    initUpdateSpan() {
      this.$updateSpan = document.createElement("span");
      this.$updateSpan.setAttribute("role", "status");
      this.$updateSpan.className = "govuk-visually-hidden";
      this.$module.appendChild(this.$updateSpan);
    }
    initButtonClickHandler() {
      this.$button.addEventListener("click", this.handleClick.bind(this));
      if (this.$skiplinkButton) {
        this.$skiplinkButton.addEventListener("click", this.handleClick.bind(this));
      }
    }
    buildIndicator() {
      this.$indicatorContainer = document.createElement("div");
      this.$indicatorContainer.className = "govuk-exit-this-page__indicator";
      this.$indicatorContainer.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 3; i++) {
        const $indicator = document.createElement("div");
        $indicator.className = "govuk-exit-this-page__indicator-light";
        this.$indicatorContainer.appendChild($indicator);
      }
      this.$button.appendChild(this.$indicatorContainer);
    }
    updateIndicator() {
      if (!this.$indicatorContainer) {
        return;
      }
      this.$indicatorContainer.classList.toggle("govuk-exit-this-page__indicator--visible", this.keypressCounter > 0);
      const $indicators = this.$indicatorContainer.querySelectorAll(".govuk-exit-this-page__indicator-light");
      $indicators.forEach(($indicator, index) => {
        $indicator.classList.toggle("govuk-exit-this-page__indicator-light--on", index < this.keypressCounter);
      });
    }
    exitPage() {
      if (!this.$updateSpan) {
        return;
      }
      this.$updateSpan.textContent = "";
      document.body.classList.add("govuk-exit-this-page-hide-content");
      this.$overlay = document.createElement("div");
      this.$overlay.className = "govuk-exit-this-page-overlay";
      this.$overlay.setAttribute("role", "alert");
      document.body.appendChild(this.$overlay);
      this.$overlay.textContent = this.i18n.t("activated");
      window.location.href = this.$button.href;
    }
    handleClick(event) {
      event.preventDefault();
      this.exitPage();
    }
    handleKeypress(event) {
      if (!this.$updateSpan) {
        return;
      }
      if ((event.key === "Shift" || event.keyCode === 16 || event.which === 16) && !this.lastKeyWasModified) {
        this.keypressCounter += 1;
        this.updateIndicator();
        if (this.timeoutMessageId) {
          window.clearTimeout(this.timeoutMessageId);
          this.timeoutMessageId = null;
        }
        if (this.keypressCounter >= 3) {
          this.keypressCounter = 0;
          if (this.keypressTimeoutId) {
            window.clearTimeout(this.keypressTimeoutId);
            this.keypressTimeoutId = null;
          }
          this.exitPage();
        } else {
          if (this.keypressCounter === 1) {
            this.$updateSpan.textContent = this.i18n.t("pressTwoMoreTimes");
          } else {
            this.$updateSpan.textContent = this.i18n.t("pressOneMoreTime");
          }
        }
        this.setKeypressTimer();
      } else if (this.keypressTimeoutId) {
        this.resetKeypressTimer();
      }
      this.lastKeyWasModified = event.shiftKey;
    }
    setKeypressTimer() {
      if (this.keypressTimeoutId) {
        window.clearTimeout(this.keypressTimeoutId);
      }
      this.keypressTimeoutId = window.setTimeout(this.resetKeypressTimer.bind(this), this.timeoutTime);
    }
    resetKeypressTimer() {
      if (!this.$updateSpan) {
        return;
      }
      if (this.keypressTimeoutId) {
        window.clearTimeout(this.keypressTimeoutId);
        this.keypressTimeoutId = null;
      }
      const $updateSpan = this.$updateSpan;
      this.keypressCounter = 0;
      $updateSpan.textContent = this.i18n.t("timedOut");
      this.timeoutMessageId = window.setTimeout(() => {
        $updateSpan.textContent = "";
      }, this.timeoutTime);
      this.updateIndicator();
    }
    resetPage() {
      document.body.classList.remove("govuk-exit-this-page-hide-content");
      if (this.$overlay) {
        this.$overlay.remove();
        this.$overlay = null;
      }
      if (this.$updateSpan) {
        this.$updateSpan.setAttribute("role", "status");
        this.$updateSpan.textContent = "";
      }
      this.updateIndicator();
      if (this.keypressTimeoutId) {
        window.clearTimeout(this.keypressTimeoutId);
      }
      if (this.timeoutMessageId) {
        window.clearTimeout(this.timeoutMessageId);
      }
    }
  };
  ExitThisPage.moduleName = "govuk-exit-this-page";
  ExitThisPage.defaults = Object.freeze({
    i18n: {
      activated: "Loading.",
      timedOut: "Exit this page expired.",
      pressTwoMoreTimes: "Shift, press 2 more times to exit.",
      pressOneMoreTime: "Shift, press 1 more time to exit."
    }
  });

  // node_modules/govuk-frontend/dist/govuk/components/header/header.mjs
  var Header = class extends GOVUKFrontendComponent {
    /**
     * Apply a matchMedia for desktop which will trigger a state sync if the
     * browser viewport moves between states.
     *
     * @param {Element | null} $module - HTML element to use for header
     */
    constructor($module) {
      super();
      this.$module = void 0;
      this.$menuButton = void 0;
      this.$menu = void 0;
      this.menuIsOpen = false;
      this.mql = null;
      if (!$module) {
        throw new ElementError({
          componentName: "Header",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      this.$module = $module;
      const $menuButton = $module.querySelector(".govuk-js-header-toggle");
      if (!$menuButton) {
        return this;
      }
      const menuId = $menuButton.getAttribute("aria-controls");
      if (!menuId) {
        throw new ElementError({
          componentName: "Header",
          identifier: 'Navigation button (`<button class="govuk-js-header-toggle">`) attribute (`aria-controls`)'
        });
      }
      const $menu = document.getElementById(menuId);
      if (!$menu) {
        throw new ElementError({
          componentName: "Header",
          element: $menu,
          identifier: `Navigation (\`<ul id="${menuId}">\`)`
        });
      }
      this.$menu = $menu;
      this.$menuButton = $menuButton;
      this.setupResponsiveChecks();
      this.$menuButton.addEventListener("click", () => this.handleMenuButtonClick());
    }
    setupResponsiveChecks() {
      const breakpoint = getBreakpoint("desktop");
      if (!breakpoint.value) {
        throw new ElementError({
          componentName: "Header",
          identifier: `CSS custom property (\`${breakpoint.property}\`) on pseudo-class \`:root\``
        });
      }
      this.mql = window.matchMedia(`(min-width: ${breakpoint.value})`);
      if ("addEventListener" in this.mql) {
        this.mql.addEventListener("change", () => this.checkMode());
      } else {
        this.mql.addListener(() => this.checkMode());
      }
      this.checkMode();
    }
    checkMode() {
      if (!this.mql || !this.$menu || !this.$menuButton) {
        return;
      }
      if (this.mql.matches) {
        this.$menu.removeAttribute("hidden");
        this.$menuButton.setAttribute("hidden", "");
      } else {
        this.$menuButton.removeAttribute("hidden");
        this.$menuButton.setAttribute("aria-expanded", this.menuIsOpen.toString());
        if (this.menuIsOpen) {
          this.$menu.removeAttribute("hidden");
        } else {
          this.$menu.setAttribute("hidden", "");
        }
      }
    }
    handleMenuButtonClick() {
      this.menuIsOpen = !this.menuIsOpen;
      this.checkMode();
    }
  };
  Header.moduleName = "govuk-header";

  // node_modules/govuk-frontend/dist/govuk/components/notification-banner/notification-banner.mjs
  var NotificationBanner = class _NotificationBanner extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element to use for notification banner
     * @param {NotificationBannerConfig} [config] - Notification banner config
     */
    constructor($module, config = {}) {
      super();
      this.$module = void 0;
      this.config = void 0;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Notification banner",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      this.$module = $module;
      this.config = mergeConfigs(_NotificationBanner.defaults, config, normaliseDataset($module.dataset));
      if (this.$module.getAttribute("role") === "alert" && !this.config.disableAutoFocus) {
        setFocus(this.$module);
      }
    }
  };
  NotificationBanner.moduleName = "govuk-notification-banner";
  NotificationBanner.defaults = Object.freeze({
    disableAutoFocus: false
  });

  // node_modules/govuk-frontend/dist/govuk/components/radios/radios.mjs
  var Radios = class extends GOVUKFrontendComponent {
    /**
     * Radios can be associated with a 'conditionally revealed' content block –
     * for example, a radio for 'Phone' could reveal an additional form field for
     * the user to enter their phone number.
     *
     * These associations are made using a `data-aria-controls` attribute, which
     * is promoted to an aria-controls attribute during initialisation.
     *
     * We also need to restore the state of any conditional reveals on the page
     * (for example if the user has navigated back), and set up event handlers to
     * keep the reveal in sync with the radio state.
     *
     * @param {Element | null} $module - HTML element to use for radios
     */
    constructor($module) {
      super();
      this.$module = void 0;
      this.$inputs = void 0;
      if (!($module instanceof HTMLElement)) {
        throw new ElementError({
          componentName: "Radios",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      const $inputs = $module.querySelectorAll('input[type="radio"]');
      if (!$inputs.length) {
        throw new ElementError({
          componentName: "Radios",
          identifier: 'Form inputs (`<input type="radio">`)'
        });
      }
      this.$module = $module;
      this.$inputs = $inputs;
      this.$inputs.forEach(($input) => {
        const targetId = $input.getAttribute("data-aria-controls");
        if (!targetId) {
          return;
        }
        if (!document.getElementById(targetId)) {
          throw new ElementError({
            componentName: "Radios",
            identifier: `Conditional reveal (\`id="${targetId}"\`)`
          });
        }
        $input.setAttribute("aria-controls", targetId);
        $input.removeAttribute("data-aria-controls");
      });
      window.addEventListener("pageshow", () => this.syncAllConditionalReveals());
      this.syncAllConditionalReveals();
      this.$module.addEventListener("click", (event) => this.handleClick(event));
    }
    syncAllConditionalReveals() {
      this.$inputs.forEach(($input) => this.syncConditionalRevealWithInputState($input));
    }
    syncConditionalRevealWithInputState($input) {
      const targetId = $input.getAttribute("aria-controls");
      if (!targetId) {
        return;
      }
      const $target = document.getElementById(targetId);
      if ($target != null && $target.classList.contains("govuk-radios__conditional")) {
        const inputIsChecked = $input.checked;
        $input.setAttribute("aria-expanded", inputIsChecked.toString());
        $target.classList.toggle("govuk-radios__conditional--hidden", !inputIsChecked);
      }
    }
    handleClick(event) {
      const $clickedInput = event.target;
      if (!($clickedInput instanceof HTMLInputElement) || $clickedInput.type !== "radio") {
        return;
      }
      const $allInputs = document.querySelectorAll('input[type="radio"][aria-controls]');
      const $clickedInputForm = $clickedInput.form;
      const $clickedInputName = $clickedInput.name;
      $allInputs.forEach(($input) => {
        const hasSameFormOwner = $input.form === $clickedInputForm;
        const hasSameName = $input.name === $clickedInputName;
        if (hasSameName && hasSameFormOwner) {
          this.syncConditionalRevealWithInputState($input);
        }
      });
    }
  };
  Radios.moduleName = "govuk-radios";

  // node_modules/govuk-frontend/dist/govuk/components/skip-link/skip-link.mjs
  var SkipLink = class extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element to use for skip link
     * @throws {ElementError} when $module is not set or the wrong type
     * @throws {ElementError} when $module.hash does not contain a hash
     * @throws {ElementError} when the linked element is missing or the wrong type
     */
    constructor($module) {
      var _this$$module$getAttr;
      super();
      this.$module = void 0;
      if (!($module instanceof HTMLAnchorElement)) {
        throw new ElementError({
          componentName: "Skip link",
          element: $module,
          expectedType: "HTMLAnchorElement",
          identifier: "Root element (`$module`)"
        });
      }
      this.$module = $module;
      const hash = this.$module.hash;
      const href = (_this$$module$getAttr = this.$module.getAttribute("href")) != null ? _this$$module$getAttr : "";
      let url;
      try {
        url = new window.URL(this.$module.href);
      } catch (error) {
        throw new ElementError(`Skip link: Target link (\`href="${href}"\`) is invalid`);
      }
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
        return;
      }
      const linkedElementId = getFragmentFromUrl(hash);
      if (!linkedElementId) {
        throw new ElementError(`Skip link: Target link (\`href="${href}"\`) has no hash fragment`);
      }
      const $linkedElement = document.getElementById(linkedElementId);
      if (!$linkedElement) {
        throw new ElementError({
          componentName: "Skip link",
          element: $linkedElement,
          identifier: `Target content (\`id="${linkedElementId}"\`)`
        });
      }
      this.$module.addEventListener("click", () => setFocus($linkedElement, {
        onBeforeFocus() {
          $linkedElement.classList.add("govuk-skip-link-focused-element");
        },
        onBlur() {
          $linkedElement.classList.remove("govuk-skip-link-focused-element");
        }
      }));
    }
  };
  SkipLink.moduleName = "govuk-skip-link";

  // node_modules/govuk-frontend/dist/govuk/components/tabs/tabs.mjs
  var Tabs = class extends GOVUKFrontendComponent {
    /**
     * @param {Element | null} $module - HTML element to use for tabs
     */
    constructor($module) {
      super();
      this.$module = void 0;
      this.$tabs = void 0;
      this.$tabList = void 0;
      this.$tabListItems = void 0;
      this.keys = {
        left: 37,
        right: 39,
        up: 38,
        down: 40
      };
      this.jsHiddenClass = "govuk-tabs__panel--hidden";
      this.changingHash = false;
      this.boundTabClick = void 0;
      this.boundTabKeydown = void 0;
      this.boundOnHashChange = void 0;
      this.mql = null;
      if (!$module) {
        throw new ElementError({
          componentName: "Tabs",
          element: $module,
          identifier: "Root element (`$module`)"
        });
      }
      const $tabs = $module.querySelectorAll("a.govuk-tabs__tab");
      if (!$tabs.length) {
        throw new ElementError({
          componentName: "Tabs",
          identifier: 'Links (`<a class="govuk-tabs__tab">`)'
        });
      }
      this.$module = $module;
      this.$tabs = $tabs;
      this.boundTabClick = this.onTabClick.bind(this);
      this.boundTabKeydown = this.onTabKeydown.bind(this);
      this.boundOnHashChange = this.onHashChange.bind(this);
      const $tabList = this.$module.querySelector(".govuk-tabs__list");
      const $tabListItems = this.$module.querySelectorAll("li.govuk-tabs__list-item");
      if (!$tabList) {
        throw new ElementError({
          componentName: "Tabs",
          identifier: 'List (`<ul class="govuk-tabs__list">`)'
        });
      }
      if (!$tabListItems.length) {
        throw new ElementError({
          componentName: "Tabs",
          identifier: 'List items (`<li class="govuk-tabs__list-item">`)'
        });
      }
      this.$tabList = $tabList;
      this.$tabListItems = $tabListItems;
      this.setupResponsiveChecks();
    }
    setupResponsiveChecks() {
      const breakpoint = getBreakpoint("tablet");
      if (!breakpoint.value) {
        throw new ElementError({
          componentName: "Tabs",
          identifier: `CSS custom property (\`${breakpoint.property}\`) on pseudo-class \`:root\``
        });
      }
      this.mql = window.matchMedia(`(min-width: ${breakpoint.value})`);
      if ("addEventListener" in this.mql) {
        this.mql.addEventListener("change", () => this.checkMode());
      } else {
        this.mql.addListener(() => this.checkMode());
      }
      this.checkMode();
    }
    checkMode() {
      var _this$mql;
      if ((_this$mql = this.mql) != null && _this$mql.matches) {
        this.setup();
      } else {
        this.teardown();
      }
    }
    setup() {
      var _this$getTab;
      this.$tabList.setAttribute("role", "tablist");
      this.$tabListItems.forEach(($item) => {
        $item.setAttribute("role", "presentation");
      });
      this.$tabs.forEach(($tab) => {
        this.setAttributes($tab);
        $tab.addEventListener("click", this.boundTabClick, true);
        $tab.addEventListener("keydown", this.boundTabKeydown, true);
        this.hideTab($tab);
      });
      const $activeTab = (_this$getTab = this.getTab(window.location.hash)) != null ? _this$getTab : this.$tabs[0];
      this.showTab($activeTab);
      window.addEventListener("hashchange", this.boundOnHashChange, true);
    }
    teardown() {
      this.$tabList.removeAttribute("role");
      this.$tabListItems.forEach(($item) => {
        $item.removeAttribute("role");
      });
      this.$tabs.forEach(($tab) => {
        $tab.removeEventListener("click", this.boundTabClick, true);
        $tab.removeEventListener("keydown", this.boundTabKeydown, true);
        this.unsetAttributes($tab);
      });
      window.removeEventListener("hashchange", this.boundOnHashChange, true);
    }
    onHashChange() {
      const hash = window.location.hash;
      const $tabWithHash = this.getTab(hash);
      if (!$tabWithHash) {
        return;
      }
      if (this.changingHash) {
        this.changingHash = false;
        return;
      }
      const $previousTab = this.getCurrentTab();
      if (!$previousTab) {
        return;
      }
      this.hideTab($previousTab);
      this.showTab($tabWithHash);
      $tabWithHash.focus();
    }
    hideTab($tab) {
      this.unhighlightTab($tab);
      this.hidePanel($tab);
    }
    showTab($tab) {
      this.highlightTab($tab);
      this.showPanel($tab);
    }
    getTab(hash) {
      return this.$module.querySelector(`a.govuk-tabs__tab[href="${hash}"]`);
    }
    setAttributes($tab) {
      const panelId = getFragmentFromUrl($tab.href);
      if (!panelId) {
        return;
      }
      $tab.setAttribute("id", `tab_${panelId}`);
      $tab.setAttribute("role", "tab");
      $tab.setAttribute("aria-controls", panelId);
      $tab.setAttribute("aria-selected", "false");
      $tab.setAttribute("tabindex", "-1");
      const $panel = this.getPanel($tab);
      if (!$panel) {
        return;
      }
      $panel.setAttribute("role", "tabpanel");
      $panel.setAttribute("aria-labelledby", $tab.id);
      $panel.classList.add(this.jsHiddenClass);
    }
    unsetAttributes($tab) {
      $tab.removeAttribute("id");
      $tab.removeAttribute("role");
      $tab.removeAttribute("aria-controls");
      $tab.removeAttribute("aria-selected");
      $tab.removeAttribute("tabindex");
      const $panel = this.getPanel($tab);
      if (!$panel) {
        return;
      }
      $panel.removeAttribute("role");
      $panel.removeAttribute("aria-labelledby");
      $panel.classList.remove(this.jsHiddenClass);
    }
    onTabClick(event) {
      const $currentTab = this.getCurrentTab();
      const $nextTab = event.currentTarget;
      if (!$currentTab || !($nextTab instanceof HTMLAnchorElement)) {
        return;
      }
      event.preventDefault();
      this.hideTab($currentTab);
      this.showTab($nextTab);
      this.createHistoryEntry($nextTab);
    }
    createHistoryEntry($tab) {
      const $panel = this.getPanel($tab);
      if (!$panel) {
        return;
      }
      const panelId = $panel.id;
      $panel.id = "";
      this.changingHash = true;
      window.location.hash = panelId;
      $panel.id = panelId;
    }
    onTabKeydown(event) {
      switch (event.keyCode) {
        case this.keys.left:
        case this.keys.up:
          this.activatePreviousTab();
          event.preventDefault();
          break;
        case this.keys.right:
        case this.keys.down:
          this.activateNextTab();
          event.preventDefault();
          break;
      }
    }
    activateNextTab() {
      const $currentTab = this.getCurrentTab();
      if (!($currentTab != null && $currentTab.parentElement)) {
        return;
      }
      const $nextTabListItem = $currentTab.parentElement.nextElementSibling;
      if (!$nextTabListItem) {
        return;
      }
      const $nextTab = $nextTabListItem.querySelector("a.govuk-tabs__tab");
      if (!$nextTab) {
        return;
      }
      this.hideTab($currentTab);
      this.showTab($nextTab);
      $nextTab.focus();
      this.createHistoryEntry($nextTab);
    }
    activatePreviousTab() {
      const $currentTab = this.getCurrentTab();
      if (!($currentTab != null && $currentTab.parentElement)) {
        return;
      }
      const $previousTabListItem = $currentTab.parentElement.previousElementSibling;
      if (!$previousTabListItem) {
        return;
      }
      const $previousTab = $previousTabListItem.querySelector("a.govuk-tabs__tab");
      if (!$previousTab) {
        return;
      }
      this.hideTab($currentTab);
      this.showTab($previousTab);
      $previousTab.focus();
      this.createHistoryEntry($previousTab);
    }
    getPanel($tab) {
      const panelId = getFragmentFromUrl($tab.href);
      if (!panelId) {
        return null;
      }
      return this.$module.querySelector(`#${panelId}`);
    }
    showPanel($tab) {
      const $panel = this.getPanel($tab);
      if (!$panel) {
        return;
      }
      $panel.classList.remove(this.jsHiddenClass);
    }
    hidePanel($tab) {
      const $panel = this.getPanel($tab);
      if (!$panel) {
        return;
      }
      $panel.classList.add(this.jsHiddenClass);
    }
    unhighlightTab($tab) {
      if (!$tab.parentElement) {
        return;
      }
      $tab.setAttribute("aria-selected", "false");
      $tab.parentElement.classList.remove("govuk-tabs__list-item--selected");
      $tab.setAttribute("tabindex", "-1");
    }
    highlightTab($tab) {
      if (!$tab.parentElement) {
        return;
      }
      $tab.setAttribute("aria-selected", "true");
      $tab.parentElement.classList.add("govuk-tabs__list-item--selected");
      $tab.setAttribute("tabindex", "0");
    }
    getCurrentTab() {
      return this.$module.querySelector(".govuk-tabs__list-item--selected a.govuk-tabs__tab");
    }
  };
  Tabs.moduleName = "govuk-tabs";

  // node_modules/govuk-frontend/dist/govuk/all.mjs
  function initAll(config) {
    var _config$scope;
    config = typeof config !== "undefined" ? config : {};
    if (!isSupported()) {
      console.log(new SupportError());
      return;
    }
    const components = [[Accordion, config.accordion], [Button, config.button], [CharacterCount, config.characterCount], [Checkboxes], [ErrorSummary, config.errorSummary], [ExitThisPage, config.exitThisPage], [Header], [NotificationBanner, config.notificationBanner], [Radios], [SkipLink], [Tabs]];
    const $scope = (_config$scope = config.scope) != null ? _config$scope : document;
    components.forEach(([Component, config2]) => {
      const $elements = $scope.querySelectorAll(`[data-module="${Component.moduleName}"]`);
      $elements.forEach(($element) => {
        try {
          "defaults" in Component ? new Component($element, config2) : new Component($element);
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  // docs/assets/javascript/all.js
  var import_all2 = __toESM(require_all());

  // docs/assets/javascript/cookies.js
  function Cookies($module) {
    this.$module = $module;
  }
  Cookies.prototype.init = function() {
    let $module = this.$module;
    if (!$module) {
      return;
    }
    const $accept = this.$module.querySelector('[name="accept"]');
    $accept.addEventListener("click", this.accept.bind(this));
    const $reject = this.$module.querySelector('[name="reject"]');
    $reject.addEventListener("click", this.reject.bind(this));
    const configEncoded = localStorage.getItem("mojpl-cookies");
    if (configEncoded) {
      const config = JSON.parse(configEncoded);
      this.load(config);
    }
  };
  Cookies.prototype.load = function(config) {
    if (config.analytics) {
      let gtag = function() {
        dataLayer.push(arguments);
      };
      window.dataLayer = window.dataLayer || [];
      gtag("js", /* @__PURE__ */ new Date());
      gtag("config", "G-VTGX4YLSVL");
    } else {
      window["ga-disable-G-VTGX4YLSVL"] = true;
    }
    this.hideMessage();
  };
  Cookies.prototype.hideMessage = function() {
    if (!this.$module.hasAttribute("data-persistent")) {
      this.$module.hidden = true;
    }
  };
  Cookies.prototype.accept = function() {
    const config = { analytics: true };
    localStorage.setItem("mojpl-cookies", JSON.stringify(config));
    this.load(config);
  };
  Cookies.prototype.reject = function() {
    const config = { analytics: false };
    localStorage.setItem("mojpl-cookies", JSON.stringify(config));
    window.location.reload();
  };
  var cookies_default = Cookies;

  // docs/assets/javascript/copy.js
  var import_clipboard = __toESM(require_clipboard());
  function Copy($module) {
    this.$module = $module;
  }
  Copy.prototype.init = function() {
    let $module = this.$module;
    if (!$module) {
      return;
    }
    let $button = document.createElement("button");
    $button.className = "app-copy-button js-copy-button";
    $button.setAttribute("aria-live", "assertive");
    $button.textContent = "Copy code";
    $module.insertBefore($button, $module.firstChild);
    this.copyAction();
  };
  Copy.prototype.copyAction = function() {
    try {
      new import_clipboard.default(".js-copy-button", {
        target: function(trigger) {
          return trigger.nextElementSibling;
        }
      }).on("success", function(e) {
        e.trigger.textContent = "Code copied";
        e.clearSelection();
        setTimeout(function() {
          e.trigger.textContent = "Copy code";
        }, 5e3);
      });
    } catch (err) {
      if (err) {
        console.log(err.message);
      }
    }
  };
  var copy_default = Copy;

  // docs/assets/javascript/tabs.js
  var Tabs2 = function(container) {
    this.container = container;
    this.keys = { left: 37, right: 39, up: 38, down: 40 };
    this.cssHide = "app-tabs__panel--hidden";
    this.tabs = container.find(".app-tabs__tab");
    this.panels = container.find(".app-tabs__panel");
    this.container.on("click", "[role=tab]", $.proxy(this, "onTabClick"));
    this.container.on("keydown", "[role=tab]", $.proxy(this, "onTabKeydown"));
    this.container.on(
      "click",
      ".app-tabs__close",
      $.proxy(this, "onCloseButtonClick")
    );
    this.setupHtml();
  };
  Tabs2.prototype.hasTab = function(hash) {
    return this.container.find(hash).length;
  };
  Tabs2.prototype.hideTab = function(tab) {
    this.unhighlightTab(tab);
    this.hidePanel(tab);
  };
  Tabs2.prototype.showTab = function(tab) {
    this.highlightTab(tab);
    this.showPanel(tab);
  };
  Tabs2.prototype.getTab = function(hash) {
    return this.tabs.filter('a[href="' + hash + '"]');
  };
  Tabs2.prototype.setupHtml = function() {
    this.container.find(".app-tabs__list").attr("role", "tablist");
    this.container.find(".app-tabs__list-item").attr("role", "presentation");
    this.tabs.attr("role", "tab");
    this.panels.attr("role", "tabpanel");
    this.tabs.each(
      $.proxy(function(i, tab) {
        let panelId = this.getHref($(tab)).slice(1);
        tab.id = "tab_" + panelId;
        $(tab).attr("aria-controls", panelId);
      }, this)
    );
    this.panels.each(
      $.proxy(function(i, panel) {
        $(panel).attr("aria-labelledby", this.tabs[i].id);
      }, this)
    );
    this.panels.addClass(this.cssHide);
  };
  Tabs2.prototype.onTabClick = function(e) {
    e.preventDefault();
    let newTab = $(e.target);
    let currentTab = this.getCurrentTab();
    if (currentTab[0]) {
      this.hideTab(currentTab);
    }
    if (newTab[0] !== currentTab[0]) {
      this.showTab(newTab);
    }
  };
  Tabs2.prototype.onTabKeydown = function(e) {
    switch (e.keyCode) {
      case this.keys.left:
      case this.keys.up:
        this.activatePreviousTab();
        e.preventDefault();
        break;
      case this.keys.right:
      case this.keys.down:
        this.activateNextTab();
        e.preventDefault();
        break;
    }
  };
  Tabs2.prototype.activateNextTab = function() {
    let currentTab = this.getCurrentTab();
    let nextTab = currentTab.parent().next().find("[role=tab]");
    if (nextTab[0]) {
      this.hideTab(currentTab);
      this.showTab(nextTab);
      nextTab.focus();
      this.createHistoryEntry(nextTab);
    }
  };
  Tabs2.prototype.activatePreviousTab = function() {
    let currentTab = this.getCurrentTab();
    let previousTab = currentTab.parent().prev().find("[role=tab]");
    if (previousTab[0]) {
      this.hideTab(currentTab);
      this.showTab(previousTab);
      previousTab.focus();
      this.createHistoryEntry(previousTab);
    }
  };
  Tabs2.prototype.getPanel = function(tab) {
    return $(this.getHref(tab));
  };
  Tabs2.prototype.showPanel = function(tab) {
    $(this.getHref(tab)).removeClass(this.cssHide);
  };
  Tabs2.prototype.hidePanel = function(tab) {
    $(this.getHref(tab)).addClass(this.cssHide);
  };
  Tabs2.prototype.unhighlightTab = function(tab) {
    tab.attr("aria-selected", "false");
  };
  Tabs2.prototype.highlightTab = function(tab) {
    tab.attr("aria-selected", "true");
  };
  Tabs2.prototype.getCurrentTab = function() {
    return this.container.find("[role=tab][aria-selected=true]");
  };
  Tabs2.prototype.getHref = function(tab) {
    let href = tab.attr("href");
    return href.slice(href.indexOf("#"), href.length);
  };
  Tabs2.prototype.onCloseButtonClick = function(e) {
    let currentTab = this.getCurrentTab();
    this.hideTab(currentTab);
    this.tabs.first().focus();
  };
  var tabs_default = Tabs2;

  // docs/assets/javascript/all.js
  initAll();
  import_all2.default.initAll();
  $(function() {
    $('[data-module="app-tabs"]').each(function(e, el) {
      new tabs_default($(el));
    });
    $('[data-module="app-copy"]').each(function(e, el) {
      new copy_default(el).init();
    });
    $('[data-module="app-cookies"]').each(function(e, el) {
      new cookies_default(el).init();
    });
  });
  window.MOJFrontend = import_all2.default;
})();
/*! Bundled license information:

clipboard/dist/clipboard.js:
  (*!
   * clipboard.js v2.0.11
   * https://clipboardjs.com/
   *
   * Licensed MIT © Zeno Rocha
   *)

govuk-frontend/dist/govuk/components/accordion/accordion.mjs:
  (**
   * Accordion component
   *
   * This allows a collection of sections to be collapsed by default, showing only
   * their headers. Sections can be expanded or collapsed individually by clicking
   * their headers. A "Show all sections" button is also added to the top of the
   * accordion, which switches to "Hide all sections" when all the sections are
   * expanded.
   *
   * The state of each section is saved to the DOM via the `aria-expanded`
   * attribute, which also provides accessibility.
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/button/button.mjs:
  (**
   * JavaScript enhancements for the Button component
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/character-count/character-count.mjs:
  (**
   * Character count component
   *
   * Tracks the number of characters or words in the `.govuk-js-character-count`
   * `<textarea>` inside the element. Displays a message with the remaining number
   * of characters/words available, or the number of characters/words in excess.
   *
   * You can configure the message to only appear after a certain percentage
   * of the available characters/words has been entered.
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/checkboxes/checkboxes.mjs:
  (**
   * Checkboxes component
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/error-summary/error-summary.mjs:
  (**
   * Error summary component
   *
   * Takes focus on initialisation for accessible announcement, unless disabled in
   * configuration.
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/exit-this-page/exit-this-page.mjs:
  (**
   * Exit this page component
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/header/header.mjs:
  (**
   * Header component
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/notification-banner/notification-banner.mjs:
  (**
   * Notification Banner component
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/radios/radios.mjs:
  (**
   * Radios component
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/skip-link/skip-link.mjs:
  (**
   * Skip link component
   *
   * @preserve
   *)

govuk-frontend/dist/govuk/components/tabs/tabs.mjs:
  (**
   * Tabs component
   *
   * @preserve
   *)
*/
