(window.webpackJsonp = window.webpackJsonp || []).push([
  [18],
  {
    123: function (e, t, n) {
      "use strict";
      n(45), n(639), n(47), n(151), n(349), n(31), n(68);
      var r = n(557),
        a = n(558),
        s = n.n(a),
        i = n(260);
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function u(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      var c = /(^|[^@\w])@(\w{1,15})\b/g,
        l = /(^|\s)#(\w+)/g,
        d = /mention:\/\/(user|team)\/(\d+)\/(.+)/gm,
        m = (function () {
          function e(t) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              a =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            o(this, e),
              (this.message = s.a.sanitize(Object(i.c)(t || ""))),
              (this.isAPrivateNote = a),
              (this.isATweet = n),
              (this.marked = r.marked);
            var u = {
              heading: function (e) {
                return "<strong>".concat(e, "</strong>");
              },
              link: function (e, t, n) {
                var r = new RegExp(d);
                return e.match(r)
                  ? '<span class="prosemirror-mention-node">'.concat(
                      n,
                      "</span>"
                    )
                  : '<a rel="noreferrer noopener nofollow" href="'
                      .concat(e, '" class="link" title="')
                      .concat(t || "", '" target="_blank">')
                      .concat(n, "</a>");
              },
            };
            this.marked.use({ renderer: u });
          }
          var t, n, a;
          return (
            (t = e),
            (n = [
              {
                key: "formatMessage",
                value: function () {
                  if (this.isATweet && !this.isAPrivateNote) {
                    var e = this.message
                      .replace(
                        c,
                        '$1<a href="http://twitter.com/$2" target="_blank" rel="noreferrer nofollow noopener">@$2</a>'
                      )
                      .replace(
                        l,
                        '$1<a href="https://twitter.com/hashtag/$2" target="_blank" rel="noreferrer nofollow noopener">#$2</a>'
                      );
                    return Object(r.marked)(e);
                  }
                  return (
                    s.a.addHook("afterSanitizeAttributes", i.a),
                    s.a.sanitize(
                      Object(r.marked)(this.message, { breaks: !0, gfm: !0 })
                    )
                  );
                },
              },
              {
                key: "formattedMessage",
                get: function () {
                  return this.formatMessage();
                },
              },
              {
                key: "plainText",
                get: function () {
                  return (
                    new DOMParser().parseFromString(
                      this.formattedMessage,
                      "text/html"
                    ).body.textContent || ""
                  );
                },
              },
            ]) && u(t.prototype, n),
            a && u(t, a),
            e
          );
        })(),
        f = m;
      t.a = {
        methods: {
          formatMessage: function (e, t, n) {
            return new f(e, t, n).formattedMessage;
          },
          getPlainText: function (e, t) {
            return new f(e, t).plainText;
          },
          truncateMessage: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "";
            return e.length < 100 ? e : "".concat(e.slice(0, 97), "...");
          },
        },
      };
    },
    1877: function (e, t, n) {
      "use strict";
      n(636);
    },
    1878: function (e, t, n) {
      "use strict";
      n(637);
    },
    2600: function (e, t, n) {
      e.exports =
        n.p +
        "media/dashboard/assets/images/chatwoot_bot-905112376e6493b37e2cecea8f9dc50c.png";
    },
    2601: function (e, t, n) {},
    2602: function (e, t, n) {},
    2618: function (e, t, n) {
      "use strict";
      n(2601);
    },
    2619: function (e, t, n) {
      "use strict";
      n(2602);
    },
    2620: function (e, t, n) {
      "use strict";
      n(6),
        n(3),
        n(5),
        n(11),
        n(8),
        n(12),
        n(27),
        n(7),
        n(28),
        n(20),
        n(25),
        n(24),
        n(45),
        n(23),
        n(46);
      var r = n(84),
        a = n(4),
        s = n(324),
        i = n(334),
        o = n(274),
        u = (n(30), n(31), n(123)),
        c = n(57),
        l = n(248),
        d = {
          name: "UnreadMessage",
          components: { Thumbnail: c.a },
          mixins: [u.a, s.a, l.a],
          props: {
            message: { type: String, default: "" },
            showSender: { type: Boolean, default: !1 },
            sender: { type: Object, default: function () {} },
            campaignId: { type: Number, default: null },
          },
          computed: {
            companyName: function () {
              return ""
                .concat(this.$t("UNREAD_VIEW.COMPANY_FROM"), " ")
                .concat(this.channelConfig.websiteName);
            },
            avatarUrl: function () {
              var e = n(2600),
                t = this.useInboxAvatarForBot ? this.inboxAvatarUrl : e;
              if (this.isSenderExist(this.sender)) {
                var r = this.sender.avatar_url;
                return r;
              }
              return t;
            },
            agentName: function () {
              if (this.isSenderExist(this.sender)) {
                var e = this.sender,
                  t = e.available_name,
                  n = e.name;
                return t || n;
              }
              return this.$t("UNREAD_VIEW.BOT");
            },
            availabilityStatus: function () {
              if (this.isSenderExist(this.sender)) {
                var e = this.sender.availability_status;
                return e;
              }
              return null;
            },
          },
          methods: {
            isSenderExist: function (e) {
              return e && !Object(r.d)(e);
            },
            onClickMessage: function () {
              this.campaignId
                ? bus.$emit(i.b, this.campaignId)
                : bus.$emit(i.c);
            },
          },
        },
        m = (n(2618), n(1)),
        f = Object(m.a)(
          d,
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "chat-bubble-wrap" }, [
              n(
                "button",
                {
                  staticClass: "chat-bubble agent",
                  class: e.$dm("bg-white", "dark:bg-slate-50"),
                  on: { click: e.onClickMessage },
                },
                [
                  e.showSender
                    ? n(
                        "div",
                        { staticClass: "row--agent-block" },
                        [
                          n("thumbnail", {
                            attrs: {
                              src: e.avatarUrl,
                              size: "20px",
                              username: e.agentName,
                              status: e.availabilityStatus,
                            },
                          }),
                          e._v(" "),
                          n("span", { staticClass: "agent--name" }, [
                            e._v(e._s(e.agentName)),
                          ]),
                          e._v(" "),
                          n("span", { staticClass: "company--name" }, [
                            e._v(" " + e._s(e.companyName)),
                          ]),
                        ],
                        1
                      )
                    : e._e(),
                  e._v(" "),
                  n("div", {
                    directives: [
                      {
                        name: "dompurify-html",
                        rawName: "v-dompurify-html",
                        value: e.formatMessage(e.message, !1),
                        expression: "formatMessage(message, false)",
                      },
                    ],
                    staticClass: "message-content",
                    staticStyle: {
                      "font-size": ".937rem",
                      "line-height": "1.618",
                    },
                  }),
                ]
              ),
            ]);
          },
          [],
          !1,
          null,
          "f33dc0de",
          null
        ).exports,
        g = n(640);
      function h(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n =
              e &&
              (("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"]);
            if (null == n) return;
            var r,
              a,
              s = [],
              i = !0,
              o = !1;
            try {
              for (
                n = n.call(e);
                !(i = (r = n.next()).done) &&
                (s.push(r.value), !t || s.length !== t);
                i = !0
              );
            } catch (u) {
              (o = !0), (a = u);
            } finally {
              try {
                i || null == n.return || n.return();
              } finally {
                if (o) throw a;
              }
            }
            return s;
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return p(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return p(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function p(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function b(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function v(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? b(Object(n), !0).forEach(function (t) {
                y(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : b(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function y(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var w = {
          name: "Unread",
          components: { FluentIcon: o.a, UnreadMessage: f },
          mixins: [s.a],
          props: { messages: { type: Array, required: !0 } },
          computed: v(
            v(
              {},
              Object(a.mapGetters)({
                unreadMessageCount: "conversation/getUnreadMessageCount",
                widgetColor: "appConfig/getWidgetColor",
              })
            ),
            {},
            {
              sender: function () {
                return h(this.messages, 1)[0].sender || {};
              },
              isBackgroundLighter: function () {
                return Object(g.a)(this.widgetColor);
              },
            }
          ),
          methods: {
            openConversationView: function () {
              bus.$emit(i.c);
            },
            closeFullView: function () {
              r.a.isIFrame() && r.a.sendMessage({ event: "toggleBubble" });
            },
            getMessageContent: function (e) {
              var t = e.attachments,
                n = e.content,
                r = t && t.length;
              return n || (r ? "\ud83d\udcd1" : "");
            },
          },
        },
        O =
          (n(2619),
          Object(m.a)(
            w,
            function () {
              var e = this,
                t = e.$createElement,
                n = e._self._c || t;
              return n("div", { staticClass: "unread-wrap" }, [
                n("div", { staticClass: "close-unread-wrap" }, [
                  n(
                    "button",
                    {
                      staticClass: "button small close-unread-button",
                      on: { click: e.closeFullView },
                    },
                    [
                      n(
                        "span",
                        { staticClass: "flex items-center" },
                        [
                          n("fluent-icon", {
                            staticClass: "mr-1",
                            attrs: { icon: "dismiss", size: "12" },
                          }),
                          e._v(
                            "\n        " +
                              e._s(e.$t("UNREAD_VIEW.CLOSE_MESSAGES_BUTTON")) +
                              "\n      "
                          ),
                        ],
                        1
                      ),
                    ]
                  ),
                ]),
                e._v(" "),
                n(
                  "div",
                  { staticClass: "unread-messages" },
                  e._l(e.messages, function (t, r) {
                    return n("unread-message", {
                      key: t.id,
                      attrs: {
                        "message-type": t.messageType,
                        "message-id": t.id,
                        "show-sender": !r,
                        sender: t.sender,
                        message: e.getMessageContent(t),
                        "campaign-id": t.campaignId,
                      },
                    });
                  }),
                  1
                ),
                e._v(" "),
                n("div", { staticClass: "open-read-view-wrap" }, [
                  e.unreadMessageCount
                    ? n(
                        "button",
                        {
                          staticClass: "button clear-button",
                          on: { click: e.openConversationView },
                        },
                        [
                          n(
                            "span",
                            {
                              staticClass: "flex items-center",
                              class: {
                                "is-background-light": e.isBackgroundLighter,
                              },
                              style: { color: e.widgetColor },
                            },
                            [
                              n("fluent-icon", {
                                staticClass: "mr-2",
                                attrs: { size: "16", icon: "arrow-right" },
                              }),
                              e._v(
                                "\n        " +
                                  e._s(
                                    e.$t("UNREAD_VIEW.VIEW_MESSAGES_BUTTON")
                                  ) +
                                  "\n      "
                              ),
                            ],
                            1
                          ),
                        ]
                      )
                    : e._e(),
                ]),
              ]);
            },
            [],
            !1,
            null,
            "4ebb42c2",
            null
          ));
      t.a = O.exports;
    },
    2846: function (e, t, n) {
      "use strict";
      n.r(t);
      n(6), n(3), n(5), n(11), n(8), n(12);
      var r = n(4);
      function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(n), !0).forEach(function (t) {
                i(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : a(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function i(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var o = {
          name: "Campaigns",
          components: { UnreadMessageList: n(2620).a },
          computed: s(
            s(
              {},
              Object(r.mapGetters)({ campaign: "campaign/getActiveCampaign" })
            ),
            {},
            {
              messages: function () {
                var e = this.campaign,
                  t = e.sender,
                  n = e.id;
                return [{ content: e.message, sender: t, campaignId: n }];
              },
            }
          ),
        },
        u = n(1),
        c = Object(u.a)(
          o,
          function () {
            var e = this,
              t = e.$createElement;
            return (e._self._c || t)("unread-message-list", {
              attrs: { messages: e.messages },
            });
          },
          [],
          !1,
          null,
          null,
          null
        );
      t.default = c.exports;
    },
    553: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return r;
      }),
        n.d(t, "b", function () {
          return a;
        });
      n(597), n(47), n(68);
      var r = function () {
          var e = 12 * (window.devicePixelRatio || 1),
            t = document.createElement("canvas");
          if (
            !t.getContext ||
            !t.getContext("2d") ||
            "function" !== typeof t.getContext("2d").fillText
          )
            return !1;
          var n = t.getContext("2d");
          return (
            (n.fillStyle = "#f00"),
            (n.textBaseline = "top"),
            (n.font = "32px Arial"),
            n.fillText("\ud83d\udc28", 0, 0),
            0 !== n.getImageData(e, e, 1, 1).data[0]
          );
        },
        a = function (e) {
          return e
            ? e
                .replace(
                  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                  ""
                )
                .replace(/\s+/g, " ")
                .trim()
            : "";
        };
    },
    57: function (e, t, n) {
      "use strict";
      n(30), n(47), n(68), n(31), n(249), n(158);
      var r = {
          name: "Avatar",
          props: {
            username: { type: String, default: "" },
            size: { type: Number, default: 40 },
          },
          computed: {
            style: function () {
              return { fontSize: "".concat(Math.floor(this.size / 2.5), "px") };
            },
            userInitial: function () {
              var e = this.username.split(/[ -]/).reduce(function (e, t) {
                return e + t.charAt(0);
              }, "");
              return (
                e.length > 2 &&
                  -1 !== e.search(/[A-Z]/) &&
                  (e = e.replace(/[a-z]+/g, "")),
                (e = e.substring(0, 2).toUpperCase())
              );
            },
          },
        },
        a = (n(1877), n(1)),
        s = Object(a.a)(
          r,
          function () {
            var e = this,
              t = e.$createElement;
            return (e._self._c || t)(
              "div",
              {
                staticClass: "avatar-container",
                style: e.style,
                attrs: { "aria-hidden": "true" },
              },
              [e._v("\n  " + e._s(e.userInitial) + "\n")]
            );
          },
          [],
          !1,
          null,
          "fce88f76",
          null
        ).exports,
        i = n(553),
        o = {
          components: { Avatar: s },
          props: {
            src: { type: String, default: "" },
            size: { type: String, default: "40px" },
            badge: { type: String, default: "" },
            username: { type: String, default: "" },
            status: { type: String, default: "" },
            hasBorder: { type: Boolean, default: !1 },
            shouldShowStatusAlways: { type: Boolean, default: !1 },
            title: { type: String, default: "" },
            variant: { type: String, default: "circle" },
          },
          data: function () {
            return { hasImageLoaded: !1, imgError: !1 };
          },
          computed: {
            userNameWithoutEmoji: function () {
              return Object(i.b)(this.username);
            },
            showStatusIndicator: function () {
              return (
                !!this.shouldShowStatusAlways ||
                "online" === this.status ||
                "busy" === this.status
              );
            },
            avatarSize: function () {
              return Number(this.size.replace(/\D+/g, ""));
            },
            badgeSrc: function () {
              return {
                instagram_direct_message: "instagram-dm",
                facebook: "messenger",
                "twitter-tweet": "twitter-tweet",
                "twitter-dm": "twitter-dm",
                whatsapp: "whatsapp",
                sms: "sms",
                "Channel::Line": "line",
                "Channel::Telegram": "telegram",
                "Channel::WebWidget": "",
              }[this.badge];
            },
            badgeStyle: function () {
              var e = Math.floor(this.avatarSize / 3),
                t = "".concat(e + 2, "px");
              return {
                width: t,
                height: t,
                borderRadius: "".concat(e / 2, "px"),
              };
            },
            statusStyle: function () {
              var e = "".concat(this.avatarSize / 4, "px");
              return { width: e, height: e };
            },
            thumbnailClass: function () {
              var e = this.hasBorder ? "border" : "",
                t =
                  "circle" === this.variant
                    ? "thumbnail-rounded"
                    : "thumbnail-square";
              return "user-thumbnail ".concat(e, " ").concat(t);
            },
            thumbnailBoxClass: function () {
              var e = "circle" === this.variant ? "is-rounded" : "";
              return "user-thumbnail-box ".concat(e);
            },
            shouldShowImage: function () {
              return !!this.src && !!this.hasImageLoaded && !this.imgError;
            },
          },
          watch: {
            src: function (e, t) {
              e !== t && this.imgError && (this.imgError = !1);
            },
          },
          methods: {
            onImgError: function () {
              this.imgError = !0;
            },
            onImgLoad: function () {
              this.hasImageLoaded = !0;
            },
          },
        },
        u =
          (n(1878),
          Object(a.a)(
            o,
            function () {
              var e = this,
                t = e.$createElement,
                n = e._self._c || t;
              return n(
                "div",
                {
                  class: e.thumbnailBoxClass,
                  style: { height: e.size, width: e.size },
                  attrs: { title: e.title },
                },
                [
                  n("img", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: e.shouldShowImage,
                        expression: "shouldShowImage",
                      },
                    ],
                    class: e.thumbnailClass,
                    attrs: { src: e.src },
                    on: { load: e.onImgLoad, error: e.onImgError },
                  }),
                  e._v(" "),
                  n("Avatar", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !e.shouldShowImage,
                        expression: "!shouldShowImage",
                      },
                    ],
                    class: e.thumbnailClass,
                    attrs: {
                      username: e.userNameWithoutEmoji,
                      size: e.avatarSize,
                    },
                  }),
                  e._v(" "),
                  e.badgeSrc
                    ? n("img", {
                        staticClass: "source-badge",
                        style: e.badgeStyle,
                        attrs: {
                          src:
                            "/integrations/channels/badges/" +
                            e.badgeSrc +
                            ".png",
                          alt: "Badge",
                        },
                      })
                    : e._e(),
                  e._v(" "),
                  e.showStatusIndicator
                    ? n("div", {
                        class:
                          "source-badge user-online-status user-online-status--" +
                          e.status,
                        style: e.statusStyle,
                      })
                    : e._e(),
                ],
                1
              );
            },
            [],
            !1,
            null,
            "4240ad79",
            null
          ));
      t.a = u.exports;
    },
    636: function (e, t, n) {},
    637: function (e, t, n) {},
    640: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return r;
      });
      n(47), n(68);
      var r = function (e) {
        var t = e.replace("#", "");
        return (
          (299 * parseInt(t.substr(0, 2), 16) +
            587 * parseInt(t.substr(2, 2), 16) +
            114 * parseInt(t.substr(4, 2), 16)) /
            1e3 >
          225
        );
      };
    },
  },
]);
//# sourceMappingURL=18-ab5ac15bd1299504db12.chunk.js.map
