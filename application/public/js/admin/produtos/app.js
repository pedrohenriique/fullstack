/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/produtos/Produtos.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/produtos/Produtos.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************/
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
      // modal Pai
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
        categoria_id: '',
        nome: '',
        valorText: '',
        ativo: true
      },
      lista: [],
      categorias: [],
      urlPaginacao: "".concat(URL_ADMIN, "/produto/atualizar"),
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
    formNovo: function formNovo() {
      this.form = _.cloneDeep(this.formDefault); //copia

      this.titulo_janela = 'Cadastro de Produto';
      this.preload = false;
      this.cadastrado = false;
      this.atualizado = false;
      this.editando = false;
      formReset();
    },
    cadastrar: function cadastrar() {
      var _this = this;

      $('#janelaForm :input:visible').trigger('blur');

      if ($('#janelaForm :input:visible.is-invalid').length) {
        mostraErro('', 'Verificar os erros');
        return false;
      }

      this.preload = true;
      axios.post("".concat(URL_ADMIN, "/produto/"), this.form).then(function (response) {
        if (response.status === 201) {
          $('#janelaForm').modal('hide');
          mostraSucesso('', 'Produto Cadastrado com Sucesso');
          _this.preload = false;
          _this.cadastrado = true;

          _this.atualizar();
        }
      })["catch"](function (error) {
        _this.cadastrado = false;
        _this.preload = false;
      });
    },
    formAlterar: function formAlterar(produto) {
      var _this2 = this;

      this.cadastrado = false;
      this.editando = true;
      this.titulo_janela = "Alterando Produto";
      formReset();
      this.form = _.cloneDeep(this.formDefault); //copia

      axios.get("".concat(URL_ADMIN, "/produto/").concat(produto, "/edit")).then(function (response) {
        Object.assign(_this2.form, response.data);
        _this2.editando = true;
      })["catch"](function (error) {
        return _this2.preloadAjax = false;
      });
    },
    formDeletar: function formDeletar(produto) {
      this.cadastrado = false;
      this.editando = false;
      this.excluindo = true;
      this.form.id = produto;
      this.titulo_janela = "Excluindo Produto";
      formReset();
    },
    deleteformDeletar: function deleteformDeletar() {
      var _this3 = this;

      this.preload = true;
      axios["delete"]("".concat(URL_ADMIN, "/produto/").concat(this.form.id)).then(function (response) {
        $('#janelaFormDeletar').modal('hide');

        if (response.status === 200) {
          mostraSucesso('', 'Produto Excluído com sucesso');
          _this3.preload = false;
          _this3.controle.carregando = true;
          _this3.excluindo = false;

          _this3.atualizar();
        }
      })["catch"](function (error) {
        return _this3.preload = false;
      });
    },
    alterarformProdutos: function alterarformProdutos() {
      var _this4 = this;

      formReset();
      $('#janelaForm :input:enabled').trigger('blur');

      if ($('#janelaForm :input:enabled.is-invalid').length) {
        mostraErro('', 'Verificar os erros');
        return false;
      }

      this.preload = true;
      axios.put("".concat(URL_ADMIN, "/produto/").concat(this.form.id), this.form).then(function (response) {
        $('#janelaForm').modal('hide');

        if (response.status === 201) {
          mostraSucesso('', 'Produto Editado com sucesso');
          _this4.preload = false;
          _this4.controle.carregando = true;
          _this4.atualizado = true;
          _this4.editando = false;

          _this4.atualizar();
        }
      })["catch"](function (error) {
        return _this4.preload = false;
      });
    },
    carregou: function carregou(dados) {
      this.lista = dados.items;
      this.categorias = dados.categorias;
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

/***/ "./resources/js/components/produtos/Produtos.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/produtos/Produtos.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Produtos_vue_vue_type_template_id_221c7054___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Produtos.vue?vue&type=template&id=221c7054& */ "./resources/js/components/produtos/Produtos.vue?vue&type=template&id=221c7054&");
/* harmony import */ var _Produtos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Produtos.vue?vue&type=script&lang=js& */ "./resources/js/components/produtos/Produtos.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Produtos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Produtos_vue_vue_type_template_id_221c7054___WEBPACK_IMPORTED_MODULE_0__.render,
  _Produtos_vue_vue_type_template_id_221c7054___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/produtos/Produtos.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/produtos/Produtos.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/produtos/Produtos.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Produtos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Produtos.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/produtos/Produtos.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Produtos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/produtos/Produtos.vue?vue&type=template&id=221c7054&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/produtos/Produtos.vue?vue&type=template&id=221c7054& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Produtos_vue_vue_type_template_id_221c7054___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Produtos_vue_vue_type_template_id_221c7054___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Produtos_vue_vue_type_template_id_221c7054___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Produtos.vue?vue&type=template&id=221c7054& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/produtos/Produtos.vue?vue&type=template&id=221c7054&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/produtos/Produtos.vue?vue&type=template&id=221c7054&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/produtos/Produtos.vue?vue&type=template&id=221c7054& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
            _vm.preload
              ? _c("p", { staticClass: " mt-2 text-center" }, [
                  _c("i", { staticClass: "fa fa-spinner fa-pulse" }),
                  _vm._v("Carregando...")
                ])
              : _vm._e(),
            _vm._v(" "),
            !_vm.preload && !_vm.cadastrado
              ? _c("div", [
                  _c("fieldset", [
                    _c("legend", [_vm._v("Informações")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col-6" }, [
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
                          attrs: { onblur: "valida_campo_vazio(this,1)" },
                          domProps: { value: _vm.form.nome },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(_vm.form, "nome", $event.target.value)
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-6" }, [
                        _c("label", [_vm._v("Categoria")]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form.categoria_id,
                                expression: "form.categoria_id"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              onblur: "valida_campo_vazio(this,1)",
                              onchange: "valida_campo_vazio(this,1)"
                            },
                            on: {
                              change: function($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function(o) {
                                    return o.selected
                                  })
                                  .map(function(o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.$set(
                                  _vm.form,
                                  "categoria_id",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              }
                            }
                          },
                          [
                            _c("option", { domProps: { value: "" } }, [
                              _vm._v("Selecione")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.categorias, function(categoria) {
                              return _c(
                                "option",
                                { domProps: { value: categoria.id } },
                                [
                                  _vm._v(
                                    _vm._s(categoria.nome) +
                                      "\n                                "
                                  )
                                ]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-6" }, [
                        _c("label", [_vm._v("Valor")]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.form.valorText,
                              expression: "form.valorText"
                            },
                            {
                              name: "mascara",
                              rawName: "v-mascara:dinheiro",
                              arg: "dinheiro"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { onblur: "valida_campo_vazio(this,1)" },
                          domProps: { value: _vm.form.valorText },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.form,
                                "valorText",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-6" }, [
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
                              onchange: "valida_campo_vazio(this,1)"
                            },
                            on: {
                              change: function($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function(o) {
                                    return o.selected
                                  })
                                  .map(function(o) {
                                    var val = "_value" in o ? o._value : o.value
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
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("template", { slot: "rodape" }, [
            _c(
              "button",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.editando,
                    expression: "!editando"
                  }
                ],
                staticClass: "btn btn-sm btn-primary",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.cadastrar()
                  }
                }
              },
              [_vm._v("\n                Cadastrar\n            ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.editando,
                    expression: "editando"
                  }
                ],
                staticClass: "btn btn-sm btn-primary",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.alterarformProdutos()
                  }
                }
              },
              [_vm._v("\n                Alterar\n            ")]
            )
          ])
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "modal",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.excluindo,
              expression: "excluindo"
            }
          ],
          attrs: {
            "modal-pai": _vm.modal,
            titulo: _vm.titulo_janela,
            id: "janelaFormDeletar",
            size: 100
          }
        },
        [
          _c("template", { slot: "conteudo" }, [
            _vm.preload
              ? _c("p", { staticClass: " mt-2 text-center" }, [
                  _c("i", { staticClass: "fa fa-spinner fa-pulse" }),
                  _vm._v("Carregando...")
                ])
              : _vm._e(),
            _vm._v(" "),
            !_vm.preload
              ? _c(
                  "div",
                  { staticClass: "alert alert-danger alert-dismissible" },
                  [
                    _c("h6", { staticClass: "text-center" }, [
                      _c("i", { staticClass: "icon fa fa-times" }),
                      _vm._v(
                        " Você deseja realmente excluir este\n                    Produto?\n                "
                      )
                    ])
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("template", { slot: "rodape" }, [
            _c(
              "button",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.editando,
                    expression: "!editando"
                  }
                ],
                staticClass: "btn btn-sm btn-danger",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.deleteformDeletar()
                  }
                }
              },
              [_vm._v("\n                Excluir\n            ")]
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
                    placeholder: "Buscar por nome, categoria ou id",
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
                    _c("option", { attrs: { value: "nome" } }, [
                      _vm._v("Nome")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "categoria_id" } }, [
                      _vm._v("Categoria")
                    ])
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
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-primary",
                  attrs: {
                    type: "button",
                    disabled: _vm.controle.carregando,
                    "data-toggle": "modal",
                    "data-target": "#janelaForm"
                  },
                  on: { click: _vm.formNovo }
                },
                [
                  _c("i", { staticClass: "fa fa-plus" }),
                  _vm._v(" Cadastrar Produto\n                ")
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
                _vm._l(_vm.lista, function(produto) {
                  return _c("tr", [
                    _c("td", { attrs: { "data-label": "Nome" } }, [
                      _vm._v(_vm._s(produto.id))
                    ]),
                    _vm._v(" "),
                    _c("td", { attrs: { "data-label": "Categoria" } }, [
                      _vm._v(_vm._s(produto.categoria.nome))
                    ]),
                    _vm._v(" "),
                    _c("td", { attrs: { "data-label": "Nome" } }, [
                      _vm._v(_vm._s(produto.nome))
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
                              return _vm.formAlterar(produto.id)
                            }
                          }
                        },
                        [_c("i", { staticClass: "fa fa-edit" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-danger",
                          attrs: {
                            type: "button",
                            "data-toggle": "modal",
                            title: "Deletar",
                            "data-target": "#janelaFormDeletar"
                          },
                          on: {
                            click: function($event) {
                              return _vm.formDeletar(produto.id)
                            }
                          }
                        },
                        [_c("i", { staticClass: "fa fa-trash" })]
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
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Categoria")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Nome")]),
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
/*!********************************************!*\
  !*** ./resources/js/admin/produtos/app.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_produtos_Produtos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/produtos/Produtos */ "./resources/js/components/produtos/Produtos.vue");

var app = new Vue({
  el: '#app',
  components: {
    Produtos: _components_produtos_Produtos__WEBPACK_IMPORTED_MODULE_0__.default
  }
});
})();

/******/ })()
;