/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/papeis/Papeis.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/papeis/Papeis.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    qntPag: {
      type: Number,
      required: false,
      "default": 20
    },
    filtro: {
      type: Boolean,
      required: false,
      "default": true
    },
    modal: {
      type: String,
      required: false,
      "default": ''
    }
  },
  data: function data() {
    return {
      hash: String(Math.random()).substr(2),
      titulo_janela: '',
      preload: false,
      editando: false,
      cadastrado: false,
      atualizado: false,
      excluindo: false,
      form: {
        nome: '',
        descricao: '',
        ativo: true
      },
      lista: [],
      listaDeHabilidades: [],
      usuario: [],
      todasHabilidades: true,
      urlPaginacao: "".concat(URL_ADMIN, "/papel/atualizar"),
      controle: {
        carregando: false,
        dados: {
          campoBusca: '',
          campoOrdenar: 'id'
        }
      }
    };
  },
  mounted: function mounted() {
    this.atualizar();
    this.formDefault = _.cloneDeep(this.form);
  },
  methods: {
    selecionarTodas: function selecionarTodas() {
      this.todasHabilidades = !this.todasHabilidades;
      var valor = this.todasHabilidades;

      _.forEach(this.listaDeHabilidades, function (habilidade) {
        habilidade.acesso = valor;
      });
    },
    formAlterar: function formAlterar(papel) {
      var _this = this;

      this.cadastrado = false;
      this.editando = true;
      this.titulo_janela = "Alterando Papel";
      formReset();
      this.form = _.cloneDeep(this.formDefault); //copia

      axios.get("".concat(URL_ADMIN, "/papel/").concat(papel, "/edit")).then(function (response) {
        Object.assign(_this.form, response.data.papel);
        _this.listaDeHabilidades = response.data.listaDeHabilidade;
        _this.usuario = response.data.usuario;
        var habilidades_papel = response.data.papel.habilidades;

        _.forEach(_this.listaDeHabilidades, function (habilidade) {
          var achou = _.find(habilidades_papel, {
            'id': habilidade.id
          });

          if (achou) {
            habilidade.acesso = true;
          }
        });

        _this.editando = true;
      })["catch"](function (error) {
        return _this.preload = false;
      });
    },
    formDeletar: function formDeletar(papel) {
      this.cadastrado = false;
      this.editando = false;
      this.excluindo = true;
      this.form.id = papel;
      this.titulo_janela = "Excluindo Papel";
      formReset();
    },
    deleteformDeletar: function deleteformDeletar() {
      var _this2 = this;

      this.preload = true;
      axios["delete"]("".concat(URL_ADMIN, "/papel/").concat(this.form.id)).then(function (response) {
        $('#janelaFormDeletar').modal('hide');

        if (response.status === 200) {
          mostraSucesso('', 'Papel Excluída com sucesso');
          _this2.preload = false;
          _this2.controle.carregando = true;
          _this2.excluindo = false;

          _this2.atualizar();
        }
      })["catch"](function (error) {
        return _this2.preload = false;
      });
    },
    alterarformPapels: function alterarformPapels() {
      var _this3 = this;

      formReset();
      $('#janelaForm :input:enabled').trigger('blur');

      if ($('#janelaForm :input:enabled.is-invalid').length) {
        mostraErro('', 'Verificar os erros');
        return false;
      }

      this.preload = true;
      this.form.listaDeHabilidades = this.listaDeHabilidades;
      axios.put("".concat(URL_ADMIN, "/papel/").concat(this.form.id), this.form).then(function (response) {
        $('#janelaForm').modal('hide');

        if (response.status === 201) {
          mostraSucesso('', 'Papel Editado com sucesso');
          _this3.preload = false;
          _this3.controle.carregando = true;
          _this3.atualizado = true;
          _this3.editando = false;

          _this3.atualizar();
        }
      })["catch"](function (error) {
        return _this3.preload = false;
      });
    },
    carregou: function carregou(dados) {
      this.lista = dados.items;
      this.controle.carregando = false;
    },
    carregando: function carregando() {
      this.controle.carregando = true;
    },
    atualizar: function atualizar() {
      this.$refs.componente.atual = 1;
      this.$refs.componente.buscar();
    }
  }
});

/***/ }),

/***/ "./resources/js/components/papeis/Papeis.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/papeis/Papeis.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Papeis_vue_vue_type_template_id_6366af54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Papeis.vue?vue&type=template&id=6366af54& */ "./resources/js/components/papeis/Papeis.vue?vue&type=template&id=6366af54&");
/* harmony import */ var _Papeis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Papeis.vue?vue&type=script&lang=js& */ "./resources/js/components/papeis/Papeis.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Papeis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Papeis_vue_vue_type_template_id_6366af54___WEBPACK_IMPORTED_MODULE_0__.render,
  _Papeis_vue_vue_type_template_id_6366af54___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/papeis/Papeis.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/papeis/Papeis.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/papeis/Papeis.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Papeis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Papeis.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/papeis/Papeis.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Papeis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/papeis/Papeis.vue?vue&type=template&id=6366af54&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/papeis/Papeis.vue?vue&type=template&id=6366af54& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Papeis_vue_vue_type_template_id_6366af54___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Papeis_vue_vue_type_template_id_6366af54___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Papeis_vue_vue_type_template_id_6366af54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Papeis.vue?vue&type=template&id=6366af54& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/papeis/Papeis.vue?vue&type=template&id=6366af54&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/papeis/Papeis.vue?vue&type=template&id=6366af54&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/papeis/Papeis.vue?vue&type=template&id=6366af54& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "componente" } },
    [
      _c(
        "modal",
        {
          attrs: {
            "modal-pai": _vm.modal,
            titulo: _vm.titulo_janela,
            id: "janelaForm",
            size: 100,
            fullscreen: true
          }
        },
        [
          _c("template", { slot: "conteudo" }, [
            _c(
              "span",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.preload,
                    expression: "preload"
                  }
                ]
              },
              [
                _c("i", { staticClass: "fa fa-spinner fa-pulse" }),
                _vm._v(" Carregando...\n        ")
              ]
            ),
            _vm._v(" "),
            _c(
              "form",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.preload,
                    expression: "!preload"
                  }
                ],
                attrs: { id: "form" }
              },
              [
                _c(
                  "ul",
                  { staticClass: "nav nav-tabs", attrs: { role: "tablist" } },
                  [
                    _c(
                      "li",
                      {
                        staticClass: "nav-item",
                        attrs: { role: "presentation" }
                      },
                      [
                        _c(
                          "a",
                          {
                            staticClass: "nav-link active",
                            attrs: {
                              href: "#abaIdentificacao",
                              "aria-controls": "home",
                              role: "tab",
                              "data-toggle": "tab"
                            }
                          },
                          [_vm._v("Identificação")]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("li", { attrs: { role: "presentation" } }, [
                      _c(
                        "a",
                        {
                          staticClass: "nav-link",
                          attrs: {
                            href: "#abaHabilidades",
                            "aria-controls": "profile",
                            role: "tab",
                            "data-toggle": "tab"
                          }
                        },
                        [_vm._v("Habilidades")]
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "tab-content" }, [
                  _c(
                    "div",
                    {
                      staticClass: "tab-pane active",
                      attrs: { role: "tabpanel", id: "abaIdentificacao" }
                    },
                    [
                      _c("fieldset", [
                        _c("legend", [_vm._v("Informações")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "row" }, [
                          _c("div", { staticClass: "col-12" }, [
                            _c("label", [_vm._v("Nome")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.form.nome,
                                  expression: "form.nome"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                onblur: "valida_campo_vazio(this,1)",
                                disabled: _vm.usuario.papel_id !== 1
                              },
                              domProps: { value: _vm.form.nome },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.form,
                                    "nome",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12" }, [
                            _c("label", [_vm._v("Descrição")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.form.descricao,
                                  expression: "form.descricao"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                onblur: "valida_campo_vazio(this,1)",
                                disabled: _vm.usuario.papel_id !== 1
                              },
                              domProps: { value: _vm.form.descricao },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.form,
                                    "descricao",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12" }, [
                            _c("label", [_vm._v("Status:")]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.ativo,
                                    expression: "form.ativo"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  onblur: "valida_campo_vazio(this,1)",
                                  onchange: "valida_campo_vazio(this,1)",
                                  disabled: _vm.usuario.papel_id !== 1
                                },
                                on: {
                                  change: function($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call($event.target.options, function(o) {
                                        return o.selected
                                      })
                                      .map(function(o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.$set(
                                      _vm.form,
                                      "ativo",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    )
                                  }
                                }
                              },
                              [
                                _c("option", { domProps: { value: true } }, [
                                  _vm._v("Ativo")
                                ]),
                                _vm._v(" "),
                                _c("option", { domProps: { value: false } }, [
                                  _vm._v("Inativo")
                                ])
                              ]
                            )
                          ])
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "tab-pane",
                      attrs: { role: "tabpanel", id: "abaHabilidades" }
                    },
                    [
                      _c("div", { staticClass: "table-responsive" }, [
                        _c(
                          "table",
                          { staticClass: "table table-hover table-condensed" },
                          [
                            _c("thead", [
                              _c("tr", [
                                _c("th", [_vm._v("Nome")]),
                                _vm._v(" "),
                                _c("th", [_vm._v("Descrição")]),
                                _vm._v(" "),
                                _c("th", [
                                  !_vm.todasHabilidades
                                    ? _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-success",
                                          attrs: {
                                            disabled: _vm.usuario.papel_id !== 1
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              return _vm.selecionarTodas()
                                            }
                                          }
                                        },
                                        [
                                          _c("span", {
                                            staticClass: "fa fa-ok",
                                            attrs: { "aria-hidden": "true" }
                                          }),
                                          _vm._v(
                                            " Todas\n                                        "
                                          )
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.todasHabilidades
                                    ? _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-danger",
                                          attrs: {
                                            disabled: _vm.usuario.papel_id !== 1
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              return _vm.selecionarTodas()
                                            }
                                          }
                                        },
                                        [
                                          _c("span", {
                                            staticClass: "fa fa-remove",
                                            attrs: { "aria-hidden": "true" }
                                          }),
                                          _vm._v(
                                            " Todas\n                                        "
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "tbody",
                              _vm._l(_vm.listaDeHabilidades, function(
                                habilidade
                              ) {
                                return _c("tr", [
                                  _c("td", [_vm._v(_vm._s(habilidade.nome))]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(habilidade.descricao))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    habilidade.acesso
                                      ? _c(
                                          "button",
                                          {
                                            staticClass: "btn btn-success",
                                            attrs: {
                                              disabled:
                                                _vm.usuario.papel_id !== 1
                                            },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                habilidade.acesso = !habilidade.acesso
                                              }
                                            }
                                          },
                                          [
                                            _c("span", {
                                              staticClass: "fa fa-ok",
                                              attrs: { "aria-hidden": "true" }
                                            }),
                                            _vm._v(
                                              " Permitir\n                                        "
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    !habilidade.acesso
                                      ? _c(
                                          "button",
                                          {
                                            staticClass: "btn btn-danger",
                                            attrs: {
                                              disabled:
                                                _vm.usuario.papel_id !== 1
                                            },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                habilidade.acesso = !habilidade.acesso
                                              }
                                            }
                                          },
                                          [
                                            _c("span", {
                                              staticClass: "fa fa-remove",
                                              attrs: { "aria-hidden": "true" }
                                            }),
                                            _vm._v(
                                              " Negar\n                                        "
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ])
                                ])
                              }),
                              0
                            )
                          ]
                        )
                      ])
                    ]
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("template", { slot: "rodape" }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.preload,
                    expression: "!preload"
                  }
                ]
              },
              [
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.editando && _vm.usuario.papel_id === 1,
                        expression: "editando && usuario.papel_id === 1"
                      }
                    ],
                    staticClass: "btn btn-sm btn-primary",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        return _vm.alterarformPapels()
                      }
                    }
                  },
                  [_vm._v("\n                    Alterar\n                ")]
                )
              ]
            )
          ])
        ],
        2
      ),
      _vm._v(" "),
      _c("fieldset", { staticClass: " mb-3" }, [
        _c("legend", [_vm._v("Filtro")]),
        _vm._v(" "),
        _c(
          "form",
          {
            staticClass: "row",
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.$refs.componente.buscar()
              }
            }
          },
          [
            _c("div", { staticClass: "col-12 col-md-3" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Buscar")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.controle.dados.campoBusca,
                      expression: "controle.dados.campoBusca"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    placeholder: "Buscar por nome ou id",
                    autocomplete: "off"
                  },
                  domProps: { value: _vm.controle.dados.campoBusca },
                  on: {
                    keyup: function($event) {
                      return _vm.$refs.componente.buscar()
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.controle.dados,
                        "campoBusca",
                        $event.target.value
                      )
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-md-3" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Ordenação")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.controle.dados.campoOrdenar,
                        expression: "controle.dados.campoOrdenar"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { disabled: _vm.controle.carregando },
                    on: {
                      change: [
                        function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            _vm.controle.dados,
                            "campoOrdenar",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        },
                        _vm.atualizar
                      ]
                    }
                  },
                  [
                    _c("option", { attrs: { value: "id" } }, [_vm._v("Id")]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "nome" } }, [_vm._v("Nome")])
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-md-12" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-success",
                  attrs: { type: "button", disabled: _vm.controle.carregando },
                  on: { click: _vm.atualizar }
                },
                [
                  _c("i", {
                    class: _vm.controle.carregando
                      ? "fa fa-sync fa-spin"
                      : "fa fa-sync"
                  }),
                  _vm._v("\n                    Buscar\n                ")
                ]
              )
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "conteudo" } },
        [
          _vm.controle.carregando
            ? _c("p", { staticClass: " mt-2 text-center" }, [
                _c("i", { staticClass: "fa fa-spinner fa-pulse" }),
                _vm._v(" Carregando...\n        ")
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.controle.carregando && _vm.lista.length === 0,
                  expression: "!controle.carregando && lista.length === 0"
                }
              ],
              staticClass: "alert alert-warning text-center"
            },
            [
              _c("i", { staticClass: "fa fa-exclamation-triangle" }),
              _vm._v(" Nenhum Registro Encontrado\n        ")
            ]
          ),
          _vm._v(" "),
          _c(
            "table",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.controle.carregando && _vm.lista.length > 0,
                  expression: "!controle.carregando && lista.length > 0"
                }
              ],
              staticClass: "tabela"
            },
            [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.lista, function(papel) {
                  return _c("tr", [
                    _c("td", { attrs: { "data-label": "ID" } }, [
                      _vm._v(_vm._s(papel.id))
                    ]),
                    _vm._v(" "),
                    _c("td", { attrs: { "data-label": "Nome" } }, [
                      _vm._v(_vm._s(papel.nome))
                    ]),
                    _vm._v(" "),
                    _c("td", { attrs: { "data-label": "Descrição" } }, [
                      _vm._v(_vm._s(papel.descricao))
                    ]),
                    _vm._v(" "),
                    _c("td", { attrs: { "data-label": "Editar" } }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-primary",
                          attrs: {
                            type: "button",
                            "data-toggle": "modal",
                            title: "Editar",
                            "data-target": "#janelaForm"
                          },
                          on: {
                            click: function($event) {
                              return _vm.formAlterar(papel.id)
                            }
                          }
                        },
                        [_c("i", { staticClass: "fa fa-edit" })]
                      )
                    ])
                  ])
                }),
                0
              )
            ]
          ),
          _vm._v(" "),
          _c("controle-paginacao", {
            ref: "componente",
            staticClass: "d-flex justify-content-center",
            attrs: {
              id: "controle",
              url: _vm.urlPaginacao,
              "por-pagina": _vm.qntPag,
              dados: _vm.controle.dados
            },
            on: { carregou: _vm.carregou, carregando: _vm.carregando }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("ID")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Nome")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Descrição")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Editar")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./resources/js/admin/papeis/app.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_papeis_Papeis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/papeis/Papeis */ "./resources/js/components/papeis/Papeis.vue");

var app = new Vue({
  el: '#app',
  components: {
    Papeis: _components_papeis_Papeis__WEBPACK_IMPORTED_MODULE_0__.default
  }
});
})();

/******/ })()
;