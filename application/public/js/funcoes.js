function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// JavaScript Document
//configuração do axios
function errorResponseHandler(error) {
  // check for errorHandle config
  if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
    return Promise.reject(error);
  }

  if (!error.response) {
    return mostraErro('', "Verifique sua conexão com a Internet.");
  } // if has response show the error


  if (error.response) {
    if (AMBIENTE === 'dev') {
      console.log(error.response);
    }

    if (error.response.status === 419) {
      return mostraErro('', '419 - Recarregue a página novamente');
    }

    if (error.response.status === 403) {
      return mostraErro('', '403 - Sem Permissão');
    }

    return mostraErro(error.response.data);
  }
} // apply interceptor on response error


axios.interceptors.response.use(function (response) {
  return response;
}, errorResponseHandler); //---------------------------------

$.ajaxSetup({
  beforeSend: function beforeSend(xhr, type) {
    if (!type.crossDomain) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
  },
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  error: function error(jqXHR, textStatus, errorThrown) {
    // mostraErro(jqXHR.responseJSON);

    /* if (jqXHR.status == 403) {
         mostraErro('Atenção!', 'Sem Autorização')
     }
     if (jqXHR.status == 404 || jqXHR.status == 417) {
         return false; // fazer o tratamento por conta propria
     }*/
    switch (jqXHR.status) {
      case 403:
        return mostraErro('Atenção!', 'Sem Autorização');

      case 404:
      case 417:
        return false;

      default:
        return mostraErro(jqXHR.responseJSON);
    }
  }
});

function replaceAll(string, token, newtoken) {
  while (string.indexOf(token) != -1) {
    string = string.replace(token, newtoken);
  }

  return string;
} // serve para dar o reset nos valores de objetos


function objectReset(form) {
  //boolean
  //object
  //string
  if (_typeof(form) === 'object') {
    //form={};
    //console.log(`rodando o campo ${form}`);
    Object.keys(form).forEach(function (campo) {
      if (form[campo] instanceof Array) {
        //console.log(`Campo array(*) ${campo}`);

        /*form[campo].forEach(outroObj => {
            objectReset(outroObj);
        })*/
        //objectReset(form[campo]);
        form[campo] = [];
        return false;
      }

      if (_typeof(form[campo]) === 'object') {
        /*Object.keys(form[campo]).forEach(outroObj => {
            objectReset(outroObj);
        })*/
        //console.log(`Campo objeto(*) ${campo}`);
        objectReset(form[campo]);
        return false; //form[campo]={};
      }

      if (typeof form[campo] === 'boolean') {
        //console.log(`Campo boolean(*) ${form}`);
        form[campo] = true; //return false;
      } else {
        if (form[campo] === 'true' || form[campo] === 'false') {
          //console.log(`Campo boolean forçado(*) ${campo}`);
          form[campo] = true;
        } else {
          //console.log(`Campo string(*) ${campo}`);
          form[campo] = '';
        }
      }
    });
    return false;
  }

  if (form instanceof Array) {
    //console.log(`Campo array ${form}`);
    form = [];
    return false;
  }

  if (typeof form === 'boolean') {
    //console.log(`Campo boolean ${form}`);
    form = true; //return false;
  } else {
    //console.log('chegou aqui: '+form);
    if (form === 'true' || form === 'false') {
      form = true;
    } else {
      form = '';
    } //console.log(`Campo string ${form}`);

  }
}

function setupCampo() {
  $('.data').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: false,
    locale: {
      applyLabel: "Aplicar",
      cancelLabel: "Cancelar",
      fromLabel: "De",
      toLabel: "Para"
    }
  });
  $('.data').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('DD/MM/YYYY'));
  });
  $('.dataRange').daterangepicker({
    singleDatePicker: false,
    showDropdowns: true,
    //autoUpdateInput:false,
    locale: {
      separator: " até ",
      applyLabel: "Aplicar",
      cancelLabel: "Cancelar",
      fromLabel: "De",
      toLabel: "Para"
    }
  });
  $('.dataRange').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('DD/MM/YYYY') + ' até ' + picker.endDate.format('DD/MM/YYYY'));
  });
}

function pctDe(valor, pct) {
  return $resposta = valor * (pct / 100);
  /*if($resposta < 0.00){
      return 0.00;
  }else{
      return $resposta;
  }*/
}

$().ready(function (e) {
  /*$('body').on('focus','.telefone, .telefone9',function(e){
      $(this).setMask('(99) 9999-99999');
  });
    $('body').on('blur','.telefone, .telefone9',function(e){
        var telefone = $(this).val();
      telefone = replaceAll(telefone,'(','');
      telefone = replaceAll(telefone,')','');
      telefone = replaceAll(telefone,' ','');
      telefone = replaceAll(telefone,'-','');
        if(telefone.length==11){
          $(this).setMask('phone9');
      }else{
          $(this).setMask('phone');
      }
    });*/
}); //remove aparencia

function formReset() {
  $('div.invalid-feedback').remove();
  $('.is-invalid').popover('disable');
  $('.is-invalid').removeClass('is-invalid');
}

function mascaraTelefone() {
  $('.telefone, .telefone9').each(function (index, element) {
    var telefone = $(this).val();
    telefone = replaceAll(telefone, '(', '');
    telefone = replaceAll(telefone, ')', '');
    telefone = replaceAll(telefone, ' ', '');
    telefone = replaceAll(telefone, '-', '');
    $(element).removeClass('telefone');
    $(element).removeClass('telefone9');

    if (telefone.length == 11) {
      $(element).setMask('phone9');
      $(element).addClass('telefone9');
    } else {
      $(element).setMask('phone');
      $(element).addClass('telefone');
    }
  });
}

function valida_telefone_vazio(obj) {
  // funcao base de validar telefone
  $(obj).next('div.invalid-feedback').remove();
  var valor = $(obj).val();
  valor = replaceAll(valor, '(', '');
  valor = replaceAll(valor, ')', '');
  valor = replaceAll(valor, ' ', '');
  valor = replaceAll(valor, '-', '');

  if (valor.length == 0) {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "Campo obrigatório");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  } else {
    if (valor.length > 0 && valor.length < 10) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">Telefone incompleto! Exemplo: (98) 3235-5010</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "Telefone incompleto! Exemplo: (98) 3235-5010");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    } else {
      $(obj).removeClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).popover('disable');
      }

      return true;
    }
  }
}

function valida_telefone(obj) {
  // funcao base de validar telefone
  $(obj).next('div.invalid-feedback').remove();
  var valor = $(obj).val();
  valor = replaceAll(valor, '(', '');
  valor = replaceAll(valor, ')', '');
  valor = replaceAll(valor, ' ', '');
  valor = replaceAll(valor, '-', '');

  if (valor.length == 0) {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  } else {
    if (valor.length > 0 && valor.length < 10) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">Telefone incompleto! Exemplo: (98) 3235-5010</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "Telefone incompleto! Exemplo: (98) 3235-5010");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    } else {
      $(obj).removeClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).popover('disable');
      }

      return true;
    }
  }
}

function valida_campo_vazio(obj, carac_minimo) {
  var valor = $(obj).val();
  var quant = carac_minimo;
  $(obj).siblings('div.invalid-feedback').remove();

  if (valor.length == 0 && quant > 0) {
    $(obj).addClass('is-invalid');

    if ($(obj).siblings('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      if ($(obj).siblings('div.input-group-append').length) {
        $(obj).siblings('div.input-group-append').after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
      } else {
        $(obj).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
      }
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "Campo obrigatório");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  } else {
    if (valor.length > 0 && valor.length < quant) {
      $(obj).addClass('is-invalid');

      if ($(obj).siblings('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        if ($(obj).siblings('div.input-group-append').length) {
          $(obj).siblings('div.input-group-append').after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
        } else {
          $(obj).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
        }
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "Campo obrigatório");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    } else {
      $(obj).removeClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).popover('disable');
      }

      return true;
    }
  }
}

function valida_campo(obj, carac_minimo) {
  var valor = $(obj).val();
  var quant = carac_minimo;
  $(obj).siblings('div.invalid-feedback').remove();

  if (valor.length == 0) {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  }

  if (valor.length > 0 && valor.length < quant) {
    $(obj).addClass('is-invalid');

    if ($(obj).siblings('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      if ($(obj).siblings('div.input-group-append').length) {
        $(obj).siblings('div.input-group-append').after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
      } else {
        $(obj).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
      }
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "Campo obrigatório");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  } else {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  }
}

function valida_cpf(obj) {
  var valor = $(obj).val();
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  var cpf;
  $(obj).next('div.invalid-feedback').remove();
  cpf = valor;
  cpf = replaceAll(cpf, '.', ''); // tira os pontos

  cpf = replaceAll(cpf, '-', ''); // tira o traço

  digitos_iguais = 1;

  if (cpf.length == 0) {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  }

  if (cpf.length < 11) {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 incompleto.</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "O CPF está incompleto.");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  }

  for (i = 0; i < cpf.length - 1; i++) {
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  }

  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;

    for (i = 10; i > 1; i--) {
      soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    }

    if (resultado != digitos.charAt(0)) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 inv\xE1lido!</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "O CPF está inválido!");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    }

    numeros = cpf.substring(0, 10);
    soma = 0;

    for (i = 11; i > 1; i--) {
      soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    }

    if (resultado != digitos.charAt(1)) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 inv\xE1lido!</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "O CPF está inválido!");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    }

    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  } else $(obj).addClass('is-invalid');

  if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
    $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 inv\xE1lido!</div>");
  }

  if ($(obj).attr('data-toggle')) {
    $(obj).attr("data-content", "O CPF está inválido!");
    $(obj).popover();
    $(obj).popover('enable');
  }

  return false;
}

function valida_cpf_vazio(obj) {
  var valor = $(obj).val();
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  var cpf;
  $(obj).next('div.invalid-feedback').remove();
  cpf = valor;
  cpf = replaceAll(cpf, '.', ''); // tira os pontos

  cpf = replaceAll(cpf, '-', ''); // tira o traço

  digitos_iguais = 1;

  if (cpf.length == 0) {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">O CPF \xE9 obrigat\xF3rio.</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "O CPF é obrigatório.");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  }

  if (cpf.length < 11) {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 incompleto.</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "O CPF está incompleto.");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  }

  for (i = 0; i < cpf.length - 1; i++) {
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  }

  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;

    for (i = 10; i > 1; i--) {
      soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    }

    if (resultado != digitos.charAt(0)) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 inv\xE1lido!</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "O CPF está inválido!");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    }

    numeros = cpf.substring(0, 10);
    soma = 0;

    for (i = 11; i > 1; i--) {
      soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    }

    if (resultado != digitos.charAt(1)) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 inv\xE1lido!</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "O CPF está inválido!");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    }

    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  } else $(obj).addClass('is-invalid');

  if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
    $(obj).after("<div class=\"invalid-feedback\">O CPF est\xE1 inv\xE1lido!</div>");
  }

  if ($(obj).attr('data-toggle')) {
    $(obj).attr("data-content", "O CPF está inválido!");
    $(obj).popover();
    $(obj).popover('enable');
  }

  return false;
}

function valida_cnpj_vazio(obj) {
  $(obj).next('div.invalid-feedback').remove();
  var cnpj = $(obj).val();
  cnpj = replaceAll(cnpj, '.', ''); // tira os pontos

  cnpj = replaceAll(cnpj, '-', ''); // tira os pontos

  cnpj = replaceAll(cnpj, '/', ''); // tira os pontos

  var soma1, soma2, resto, digito1, digito2;

  if (cnpj.length != 14) {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">O CNPJ est\xE1 incompleto!</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "O CNPJ está incompleto!");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  }

  soma1 = cnpj[0] * 5 + cnpj[1] * 4 + cnpj[2] * 3 + cnpj[3] * 2 + cnpj[4] * 9 + cnpj[5] * 8 + cnpj[6] * 7 + cnpj[7] * 6 + cnpj[8] * 5 + cnpj[9] * 4 + cnpj[10] * 3 + cnpj[11] * 2;
  resto = soma1 % 11;
  digito1 = resto < 2 ? 0 : 11 - resto;
  soma2 = cnpj[0] * 6 + cnpj[1] * 5 + cnpj[2] * 4 + cnpj[3] * 3 + cnpj[4] * 2 + cnpj[5] * 9 + cnpj[6] * 8 + cnpj[7] * 7 + cnpj[8] * 6 + cnpj[9] * 5 + cnpj[10] * 4 + cnpj[11] * 3 + cnpj[12] * 2;
  resto = soma2 % 11;
  digito2 = resto < 2 ? 0 : 11 - resto;

  if (cnpj[12] == digito1 && cnpj[13] == digito2) {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  } else {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">CNPJ inv\xE1lido!</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "CNPJ inválido!");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  }
}

function valida_data_vazio(obj) {
  $(obj).next('div.invalid-feedback').remove();
  var valor = $(obj).val();

  if (valor.length == 0) {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "Campo obrigatório");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  } else {
    if (valor.length > 0 && valor.length < 10) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">Data incompleta! Exemplo: dd/mm/aaaa</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "Data incompleta! Exemplo: dd/mm/aaaa");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    } else {
      $(obj).removeClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).popover('disable');
      }

      return true;
    }
  }
}

function valida_data(obj) {
  $(obj).next('div.invalid-feedback').remove();
  var valor = $(obj).val();

  if (valor.length == 0) {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  } else {
    if (valor.length > 0 && valor.length < 10) {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">Data incompleta! Exemplo: dd/mm/aaaa</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "Data incompleta! Exemplo: dd/mm/aaaa");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    } else {
      $(obj).removeClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).popover('disable');
      }

      return true;
    }
  }
}

function valida_cep_vazio(obj) {
  $(obj).siblings('div.invalid-feedback').remove();
  var valor = $(obj).val();

  if (valor.length == 0) {
    $(obj).addClass('is-invalid');

    if (($(obj).siblings('div.invalid-feedback').length == 0 || $(obj).siblings('div.input-group-append').length == 0) && !$(obj).attr('data-toggle')) {
      if ($(obj).siblings('div.input-group-append').length) {
        $(obj).next('div.input-group-append').eq(0).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
      } else {
        $(obj).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
      }
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "Campo obrigatório");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  } else {
    if (valor.length > 0 && valor.length < 9) {
      $(obj).addClass('is-invalid');

      if (($(obj).siblings('div.invalid-feedback').length == 0 || $(obj).siblings('div.input-group-append').length == 0) && !$(obj).attr('data-toggle')) {
        if ($(obj).siblings('div.input-group-append').length) {
          $(obj).next('div.input-group-append').eq(0).after("<div class=\"invalid-feedback\">Exemplo: 65000-000</div>");
        } else {
          $(obj).after("<div class=\"invalid-feedback\">Exemplo: 65000-000</div>");
        }
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "Exemplo: 65000-000");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    } else {
      $(obj).removeClass('is-invalid');

      if (($(obj).siblings('div.invalid-feedback').length > 0 || $(obj).siblings('div.input-group-append').length > 0) && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).popover('disable');
      }

      return true;
    }
  }
}

function valida_dinheiro(obj) {
  $(obj).siblings('div.invalid-feedback').remove();
  var valor = convertFloat($(obj).val());

  if (valor == 0.00) {
    $(obj).addClass('is-invalid');

    if ($(obj).siblings('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      if ($(obj).siblings('div.input-group-append').length) {
        $(obj).siblings('div.input-group-append').after("<div class=\"invalid-feedback\">O valor n\xE3o pode ser 0,00</div>");
      } else {
        $(obj).after("<div class=\"invalid-feedback\">O valor n\xE3o pode ser 0,00</div>");
      }
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "O valor não pode ser 0,00");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  } else {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  }
}

function testaEmail(email) {
  //var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
}

function validaEmailVazio(obj) {
  $(obj).next('div.invalid-feedback').remove(); //var regex=/^[\w.-_\+]+@[\w-]+(\.\w{2,4})+$/;

  var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var valor = $(obj).val();

  if (regex.test(valor)) {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  } else {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">E-mail inv\xE1lido</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "E-mail inválido");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  }
}

function validaEmail(obj) {
  $(obj).next('div.invalid-feedback').remove(); //var regex=/^[\w.-_\+]+@[\w-]+(\.\w{2,4})+$/;

  var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var valor = $(obj).val();

  if (regex.test(valor)) {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  } else {
    if (valor.length == 0) {
      $(obj).removeClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).popover('disable');
      }

      return true;
    } else {
      $(obj).addClass('is-invalid');

      if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
        $(obj).after("<div class=\"invalid-feedback\">E-mail inv\xE1lido</div>");
      }

      if ($(obj).attr('data-toggle')) {
        $(obj).attr("data-content", "E-mail inválido");
        $(obj).popover();
        $(obj).popover('enable');
      }

      return false;
    }
  }
}

function convertFloat(string) {
  if (string === "") {
    return 0;
  }

  while (string.indexOf(".") != -1) {
    string = string.replace(".", "");
  }

  string = string.replace(",", ".");

  if (string) {
    return parseFloat(string);
  } else {
    return 0;
  }
}

function convertRealFloat(valor) {
  var absoluta = Math.floor(valor);
  var fracao = valor - absoluta;
  fracao = String(fracao);
  fracao = fracao.substr(0, 4);
  fracao = parseFloat(fracao);
  return absoluta + fracao;
}

function number_format(number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
      dec = typeof dec_point === 'undefined' ? '.' : dec_point,
      s = '',
      toFixedFix = function toFixedFix(n, prec) {
    var k = Math.pow(10, prec);
    return '' + Math.round(n * k) / k;
  }; // Fix for IE parseFloat(0.55).toFixed(0) = 0;


  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }

  return s.join(dec);
}

function mostraErro(retornoLaravel) {
  var titulo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Ocorreu um erro';
  var quantidade = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

  if (retornoLaravel === undefined) {
    return false;
  }

  var mensagem = '';
  titulo = retornoLaravel.msg ? retornoLaravel.msg : titulo;

  var lista = _.keys(retornoLaravel.erros);

  if (lista.length) {
    mensagem += "<ul>";
    var total = 1;
    lista.every(function (key, item) {
      var descricao = retornoLaravel.erros[key][0];
      mensagem += "<li> <strong>".concat(key, ":</strong> ").concat(descricao, " </li>");
      total++;

      if (total == quantidade) {
        return false;
      }
    });
    mensagem += "</ul>";
  } else {
    mensagem = retornoLaravel.message;
  }

  toastr.error(mensagem, titulo);
}

function mostraSucesso(mensagem, titulo) {
  toastr.success(mensagem, titulo);
}

function valida_select(obj) {
  var valor = $(obj).val();
  $(obj).next('div.invalid-feedback').remove();

  if (valor == 0) {
    $(obj).addClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length == 0 && !$(obj).attr('data-toggle')) {
      $(obj).after("<div class=\"invalid-feedback\">Campo obrigat\xF3rio</div>");
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).attr("data-content", "Campo obrigatório");
      $(obj).popover();
      $(obj).popover('enable');
    }

    return false;
  } else {
    $(obj).removeClass('is-invalid');

    if ($(obj).next('div.invalid-feedback').length > 0 && !$(obj).attr('data-toggle')) {//$(obj).next('div.invalid-feedback').remove();
    }

    if ($(obj).attr('data-toggle')) {
      $(obj).popover('disable');
    }

    return true;
  }
}

function capitalize(str) {
  var lower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, function (match) {
    return match.toUpperCase();
  });
}

function lower(str) {
  var lower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, function (match) {
    return match.toLowerCase();
  });
}

$(function () {
  $('.navbar .dropdown-item').on('click', function (e) {
    var $el = $(this).children('.dropdown-toggle');
    var $parent = $el.offsetParent(".dropdown-menu");
    $(this).parent("li").toggleClass('open');

    if (!$parent.parent().hasClass('navbar-nav')) {
      if ($parent.hasClass('show')) {
        $parent.removeClass('show');
        $el.next().removeClass('show');
        $el.next().css({
          "top": -999,
          "left": -999
        });
      } else {
        $parent.parent().find('.show').removeClass('show');
        $parent.addClass('show');
        $el.next().addClass('show');
        $el.next().css({
          "top": $el[0].offsetTop,
          "left": $parent.outerWidth() - 4
        });
      }

      e.preventDefault();
      e.stopPropagation();
    }
  });
  $('.navbar .dropdown').on('hidden.bs.dropdown', function () {
    $(this).find('li.dropdown').removeClass('show open');
    $(this).find('ul.dropdown-menu').removeClass('show open');
  });
});
/**
 * jquery.mask.js
 * @version: v1.14.15
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at github.com/igorescobar/jQuery-Mask-Plugin
 *
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */

/* jshint maxcomplexity:17 */

/* global define */
// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js

(function (factory, jQuery, Zepto) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery || Zepto);
  }
})(function ($) {
  'use strict';

  var Mask = function Mask(el, mask, options) {
    var p = {
      invalid: [],
      getCaret: function getCaret() {
        try {
          var sel,
              pos = 0,
              ctrl = el.get(0),
              dSel = document.selection,
              cSelStart = ctrl.selectionStart; // IE Support

          if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
            sel = dSel.createRange();
            sel.moveStart('character', -p.val().length);
            pos = sel.text.length;
          } // Firefox support
          else if (cSelStart || cSelStart === '0') {
              pos = cSelStart;
            }

          return pos;
        } catch (e) {}
      },
      setCaret: function setCaret(pos) {
        try {
          if (el.is(':focus')) {
            var range,
                ctrl = el.get(0); // Firefox, WebKit, etc..

            if (ctrl.setSelectionRange) {
              ctrl.setSelectionRange(pos, pos);
            } else {
              // IE
              range = ctrl.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          }
        } catch (e) {}
      },
      events: function events() {
        el.on('keydown.mask', function (e) {
          el.data('mask-keycode', e.keyCode || e.which);
          el.data('mask-previus-value', el.val());
          el.data('mask-previus-caret-pos', p.getCaret());
          p.maskDigitPosMapOld = p.maskDigitPosMap;
        }).on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour).on('paste.mask drop.mask', function () {
          setTimeout(function () {
            el.keydown().keyup();
          }, 100);
        }).on('change.mask', function () {
          el.data('changed', true);
        }).on('blur.mask', function () {
          if (oldValue !== p.val() && !el.data('changed')) {
            el.trigger('change');
          }

          el.data('changed', false);
        }) // it's very important that this callback remains in this position
        // otherwhise oldValue it's going to work buggy
        .on('blur.mask', function () {
          oldValue = p.val();
        }) // select all text on focus
        .on('focus.mask', function (e) {
          if (options.selectOnFocus === true) {
            $(e.target).select();
          }
        }) // clear the value if it not complete the mask
        .on('focusout.mask', function () {
          if (options.clearIfNotMatch && !regexMask.test(p.val())) {
            p.val('');
          }
        });
      },
      getRegexMask: function getRegexMask() {
        var maskChunks = [],
            translation,
            pattern,
            optional,
            recursive,
            oRecursive,
            r;

        for (var i = 0; i < mask.length; i++) {
          translation = jMask.translation[mask.charAt(i)];

          if (translation) {
            pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
            optional = translation.optional;
            recursive = translation.recursive;

            if (recursive) {
              maskChunks.push(mask.charAt(i));
              oRecursive = {
                digit: mask.charAt(i),
                pattern: pattern
              };
            } else {
              maskChunks.push(!optional && !recursive ? pattern : pattern + '?');
            }
          } else {
            maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
          }
        }

        r = maskChunks.join('');

        if (oRecursive) {
          r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?').replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
        }

        return new RegExp(r);
      },
      destroyEvents: function destroyEvents() {
        el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
      },
      val: function val(v) {
        var isInput = el.is('input'),
            method = isInput ? 'val' : 'text',
            r;

        if (arguments.length > 0) {
          if (el[method]() !== v) {
            el[method](v);
          }

          r = el;
        } else {
          r = el[method]();
        }

        return r;
      },
      calculateCaretPosition: function calculateCaretPosition() {
        var oldVal = el.data('mask-previus-value') || '',
            newVal = p.getMasked(),
            caretPosNew = p.getCaret();

        if (oldVal !== newVal) {
          var caretPosOld = el.data('mask-previus-caret-pos') || 0,
              newValL = newVal.length,
              oldValL = oldVal.length,
              maskDigitsBeforeCaret = 0,
              maskDigitsAfterCaret = 0,
              maskDigitsBeforeCaretAll = 0,
              maskDigitsBeforeCaretAllOld = 0,
              i = 0;

          for (i = caretPosNew; i < newValL; i++) {
            if (!p.maskDigitPosMap[i]) {
              break;
            }

            maskDigitsAfterCaret++;
          }

          for (i = caretPosNew - 1; i >= 0; i--) {
            if (!p.maskDigitPosMap[i]) {
              break;
            }

            maskDigitsBeforeCaret++;
          }

          for (i = caretPosNew - 1; i >= 0; i--) {
            if (p.maskDigitPosMap[i]) {
              maskDigitsBeforeCaretAll++;
            }
          }

          for (i = caretPosOld - 1; i >= 0; i--) {
            if (p.maskDigitPosMapOld[i]) {
              maskDigitsBeforeCaretAllOld++;
            }
          } // if the cursor is at the end keep it there


          if (caretPosNew > oldValL) {
            caretPosNew = newValL * 10;
          } else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
            if (!p.maskDigitPosMapOld[caretPosNew]) {
              var caretPos = caretPosNew;
              caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
              caretPosNew -= maskDigitsBeforeCaret;

              if (p.maskDigitPosMap[caretPosNew]) {
                caretPosNew = caretPos;
              }
            }
          } else if (caretPosNew > caretPosOld) {
            caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
            caretPosNew += maskDigitsAfterCaret;
          }
        }

        return caretPosNew;
      },
      behaviour: function behaviour(e) {
        e = e || window.event;
        p.invalid = [];
        var keyCode = el.data('mask-keycode');

        if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
          var newVal = p.getMasked(),
              caretPos = p.getCaret(); // this is a compensation to devices/browsers that don't compensate
          // caret positioning the right way

          setTimeout(function () {
            p.setCaret(p.calculateCaretPosition());
          }, $.jMaskGlobals.keyStrokeCompensation);
          p.val(newVal);
          p.setCaret(caretPos);
          return p.callbacks(e);
        }
      },
      getMasked: function getMasked(skipMaskChars, val) {
        var buf = [],
            value = val === undefined ? p.val() : val + '',
            m = 0,
            maskLen = mask.length,
            v = 0,
            valLen = value.length,
            offset = 1,
            addMethod = 'push',
            resetPos = -1,
            maskDigitCount = 0,
            maskDigitPosArr = [],
            lastMaskChar,
            check;

        if (options.reverse) {
          addMethod = 'unshift';
          offset = -1;
          lastMaskChar = 0;
          m = maskLen - 1;
          v = valLen - 1;

          check = function check() {
            return m > -1 && v > -1;
          };
        } else {
          lastMaskChar = maskLen - 1;

          check = function check() {
            return m < maskLen && v < valLen;
          };
        }

        var lastUntranslatedMaskChar;

        while (check()) {
          var maskDigit = mask.charAt(m),
              valDigit = value.charAt(v),
              translation = jMask.translation[maskDigit];

          if (translation) {
            if (valDigit.match(translation.pattern)) {
              buf[addMethod](valDigit);

              if (translation.recursive) {
                if (resetPos === -1) {
                  resetPos = m;
                } else if (m === lastMaskChar && m !== resetPos) {
                  m = resetPos - offset;
                }

                if (lastMaskChar === resetPos) {
                  m -= offset;
                }
              }

              m += offset;
            } else if (valDigit === lastUntranslatedMaskChar) {
              // matched the last untranslated (raw) mask character that we encountered
              // likely an insert offset the mask character from the last entry; fall
              // through and only increment v
              maskDigitCount--;
              lastUntranslatedMaskChar = undefined;
            } else if (translation.optional) {
              m += offset;
              v -= offset;
            } else if (translation.fallback) {
              buf[addMethod](translation.fallback);
              m += offset;
              v -= offset;
            } else {
              p.invalid.push({
                p: v,
                v: valDigit,
                e: translation.pattern
              });
            }

            v += offset;
          } else {
            if (!skipMaskChars) {
              buf[addMethod](maskDigit);
            }

            if (valDigit === maskDigit) {
              maskDigitPosArr.push(v);
              v += offset;
            } else {
              lastUntranslatedMaskChar = maskDigit;
              maskDigitPosArr.push(v + maskDigitCount);
              maskDigitCount++;
            }

            m += offset;
          }
        }

        var lastMaskCharDigit = mask.charAt(lastMaskChar);

        if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
          buf.push(lastMaskCharDigit);
        }

        var newVal = buf.join('');
        p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
        return newVal;
      },
      mapMaskdigitPositions: function mapMaskdigitPositions(newVal, maskDigitPosArr, valLen) {
        var maskDiff = options.reverse ? newVal.length - valLen : 0;
        p.maskDigitPosMap = {};

        for (var i = 0; i < maskDigitPosArr.length; i++) {
          p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
        }
      },
      callbacks: function callbacks(e) {
        var val = p.val(),
            changed = val !== oldValue,
            defaultArgs = [val, e, el, options],
            callback = function callback(name, criteria, args) {
          if (typeof options[name] === 'function' && criteria) {
            options[name].apply(this, args);
          }
        };

        callback('onChange', changed === true, defaultArgs);
        callback('onKeyPress', changed === true, defaultArgs);
        callback('onComplete', val.length === mask.length, defaultArgs);
        callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
      }
    };
    el = $(el);
    var jMask = this,
        oldValue = p.val(),
        regexMask;
    mask = typeof mask === 'function' ? mask(p.val(), undefined, el, options) : mask; // public methods

    jMask.mask = mask;
    jMask.options = options;

    jMask.remove = function () {
      var caret = p.getCaret();

      if (jMask.options.placeholder) {
        el.removeAttr('placeholder');
      }

      if (el.data('mask-maxlength')) {
        el.removeAttr('maxlength');
      }

      p.destroyEvents();
      p.val(jMask.getCleanVal());
      p.setCaret(caret);
      return el;
    }; // get value without mask


    jMask.getCleanVal = function () {
      return p.getMasked(true);
    }; // get masked value without the value being in the input or element


    jMask.getMaskedVal = function (val) {
      return p.getMasked(false, val);
    };

    jMask.init = function (onlyMask) {
      onlyMask = onlyMask || false;
      options = options || {};
      jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
      jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
      jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation);
      jMask = $.extend(true, {}, jMask, options);
      regexMask = p.getRegexMask();

      if (onlyMask) {
        p.events();
        p.val(p.getMasked());
      } else {
        if (options.placeholder) {
          el.attr('placeholder', options.placeholder);
        } // this is necessary, otherwise if the user submit the form
        // and then press the "back" button, the autocomplete will erase
        // the data. Works fine on IE9+, FF, Opera, Safari.


        if (el.data('mask')) {
          el.attr('autocomplete', 'off');
        } // detect if is necessary let the user type freely.
        // for is a lot faster than forEach.


        for (var i = 0, maxlength = true; i < mask.length; i++) {
          var translation = jMask.translation[mask.charAt(i)];

          if (translation && translation.recursive) {
            maxlength = false;
            break;
          }
        }

        if (maxlength) {
          el.attr('maxlength', mask.length).data('mask-maxlength', true);
        }

        p.destroyEvents();
        p.events();
        var caret = p.getCaret();
        p.val(p.getMasked());
        p.setCaret(caret);
      }
    };

    jMask.init(!el.is('input'));
  };

  $.maskWatchers = {};

  var HTMLAttributes = function HTMLAttributes() {
    var input = $(this),
        options = {},
        prefix = 'data-mask-',
        mask = input.attr('data-mask');

    if (input.attr(prefix + 'reverse')) {
      options.reverse = true;
    }

    if (input.attr(prefix + 'clearifnotmatch')) {
      options.clearIfNotMatch = true;
    }

    if (input.attr(prefix + 'selectonfocus') === 'true') {
      options.selectOnFocus = true;
    }

    if (notSameMaskObject(input, mask, options)) {
      return input.data('mask', new Mask(this, mask, options));
    }
  },
      notSameMaskObject = function notSameMaskObject(field, mask, options) {
    options = options || {};
    var maskObject = $(field).data('mask'),
        stringify = JSON.stringify,
        value = $(field).val() || $(field).text();

    try {
      if (typeof mask === 'function') {
        mask = mask(value);
      }

      return _typeof(maskObject) !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
    } catch (e) {}
  },
      eventSupported = function eventSupported(eventName) {
    var el = document.createElement('div'),
        isSupported;
    eventName = 'on' + eventName;
    isSupported = eventName in el;

    if (!isSupported) {
      el.setAttribute(eventName, 'return;');
      isSupported = typeof el[eventName] === 'function';
    }

    el = null;
    return isSupported;
  };

  $.fn.mask = function (mask, options) {
    options = options || {};

    var selector = this.selector,
        globals = $.jMaskGlobals,
        interval = globals.watchInterval,
        watchInputs = options.watchInputs || globals.watchInputs,
        maskFunction = function maskFunction() {
      if (notSameMaskObject(this, mask, options)) {
        return $(this).data('mask', new Mask(this, mask, options));
      }
    };

    $(this).each(maskFunction);

    if (selector && selector !== '' && watchInputs) {
      clearInterval($.maskWatchers[selector]);
      $.maskWatchers[selector] = setInterval(function () {
        $(document).find(selector).each(maskFunction);
      }, interval);
    }

    return this;
  };

  $.fn.masked = function (val) {
    return this.data('mask').getMaskedVal(val);
  };

  $.fn.unmask = function () {
    clearInterval($.maskWatchers[this.selector]);
    delete $.maskWatchers[this.selector];
    return this.each(function () {
      var dataMask = $(this).data('mask');

      if (dataMask) {
        dataMask.remove().removeData('mask');
      }
    });
  };

  $.fn.cleanVal = function () {
    return this.data('mask').getCleanVal();
  };

  $.applyDataMask = function (selector) {
    selector = selector || $.jMaskGlobals.maskElements;
    var $selector = selector instanceof $ ? selector : $(selector);
    $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
  };

  var globals = {
    maskElements: 'input,td,span,div',
    dataMaskAttr: '*[data-mask]',
    dataMask: true,
    watchInterval: 300,
    watchInputs: true,
    keyStrokeCompensation: 10,
    // old versions of chrome dont work great with input event
    useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
    watchDataMask: false,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      '0': {
        pattern: /\d/
      },
      '9': {
        pattern: /\d/,
        optional: true
      },
      '#': {
        pattern: /\d/,
        recursive: true
      },
      'A': {
        pattern: /[a-zA-Z0-9]/
      },
      'S': {
        pattern: /[a-zA-Z]/
      }
    }
  };
  $.jMaskGlobals = $.jMaskGlobals || {};
  globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals); // looking for inputs with data-mask attribute

  if (globals.dataMask) {
    $.applyDataMask();
  }

  setInterval(function () {
    if ($.jMaskGlobals.watchDataMask) {
      $.applyDataMask();
    }
  }, globals.watchInterval);
}, window.jQuery, window.Zepto);
/*
 *  jquery-maskmoney - v3.1.1
 *  jQuery plugin to mask data entry in the input text in the form of money (currency)
 *  https://github.com/plentz/jquery-maskmoney
 *
 *  Made by Diego Plentz
 *  Under MIT License
 */


(function ($) {
  "use strict";

  if (!$.browser) {
    $.browser = {};
    $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    $.browser.device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  }

  var defaultOptions = {
    prefix: "",
    suffix: "",
    affixesStay: true,
    thousands: ",",
    decimal: ".",
    precision: 2,
    allowZero: false,
    allowNegative: false,
    doubleClickSelection: true,
    allowEmpty: false,
    bringCaretAtEndOnFocus: true
  },
      methods = {
    destroy: function destroy() {
      $(this).unbind(".maskMoney");

      if ($.browser.msie) {
        this.onpaste = null;
      }

      return this;
    },
    applyMask: function applyMask(value) {
      var $input = $(this); // data-* api

      var settings = $input.data("settings");
      return maskValue(value, settings);
    },
    mask: function mask(value) {
      return this.each(function () {
        var $this = $(this);

        if (typeof value === "number") {
          $this.val(value);
        }

        return $this.trigger("mask");
      });
    },
    unmasked: function unmasked() {
      return this.map(function () {
        var value = $(this).val() || "0",
            isNegative = value.indexOf("-") !== -1,
            decimalPart; // get the last position of the array that is a number(coercion makes "" to be evaluated as false)

        $(value.split(/\D/).reverse()).each(function (index, element) {
          if (element) {
            decimalPart = element;
            return false;
          }
        });
        value = value.replace(/\D/g, "");
        value = value.replace(new RegExp(decimalPart + "$"), "." + decimalPart);

        if (isNegative) {
          value = "-" + value;
        }

        return parseFloat(value);
      });
    },
    unmaskedWithOptions: function unmaskedWithOptions() {
      return this.map(function () {
        var value = $(this).val() || "0",
            settings = $(this).data("settings") || defaultOptions,
            regExp = new RegExp(settings.thousandsForUnmasked || settings.thousands, "g");
        value = value.replace(regExp, "");
        return parseFloat(value);
      });
    },
    init: function init(parameters) {
      // the default options should not be shared with others
      parameters = $.extend($.extend({}, defaultOptions), parameters);
      return this.each(function () {
        var $input = $(this),
            settings,
            onFocusValue; // data-* api

        settings = $.extend({}, parameters);
        settings = $.extend(settings, $input.data()); // Store settings for use with the applyMask method.

        $input.data("settings", settings);

        function getInputSelection() {
          var el = $input.get(0),
              start = 0,
              end = 0,
              normalizedValue,
              range,
              textInputRange,
              len,
              endRange;

          if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
            start = el.selectionStart;
            end = el.selectionEnd;
          } else {
            range = document.selection.createRange();

            if (range && range.parentElement() === el) {
              len = el.value.length;
              normalizedValue = el.value.replace(/\r\n/g, "\n"); // Create a working TextRange that lives only in the input

              textInputRange = el.createTextRange();
              textInputRange.moveToBookmark(range.getBookmark()); // Check if the start and end of the selection are at the very end
              // of the input, since moveStart/moveEnd doesn't return what we want
              // in those cases

              endRange = el.createTextRange();
              endRange.collapse(false);

              if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
              } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                  end = len;
                } else {
                  end = -textInputRange.moveEnd("character", -len);
                  end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
              }
            }
          }

          return {
            start: start,
            end: end
          };
        } // getInputSelection


        function canInputMoreNumbers() {
          var haventReachedMaxLength = !($input.val().length >= $input.attr("maxlength") && $input.attr("maxlength") >= 0),
              selection = getInputSelection(),
              start = selection.start,
              end = selection.end,
              haveNumberSelected = selection.start !== selection.end && $input.val().substring(start, end).match(/\d/) ? true : false,
              startWithZero = $input.val().substring(0, 1) === "0";
          return haventReachedMaxLength || haveNumberSelected || startWithZero;
        }

        function setCursorPosition(pos) {
          // Do not set the position if
          // the we're formatting on blur.
          // This is because we do not want
          // to refocus on the control after
          // the blur.
          if (!!settings.formatOnBlur) {
            return;
          }

          $input.each(function (index, elem) {
            if (elem.setSelectionRange) {
              elem.focus();
              elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
              var range = elem.createTextRange();
              range.collapse(true);
              range.moveEnd("character", pos);
              range.moveStart("character", pos);
              range.select();
            }
          });
        }

        function maskAndPosition(startPos) {
          var originalLen = $input.val().length,
              newLen;
          $input.val(maskValue($input.val(), settings));
          newLen = $input.val().length; // If the we're using the reverse option,
          // do not put the cursor at the end of
          // the input. The reverse option allows
          // the user to input text from left to right.

          if (!settings.reverse) {
            startPos = startPos - (originalLen - newLen);
          }

          setCursorPosition(startPos);
        }

        function mask() {
          var value = $input.val();

          if (settings.allowEmpty && value === "") {
            return;
          }

          var decimalPointIndex = value.indexOf(settings.decimal);

          if (settings.precision > 0) {
            if (decimalPointIndex < 0) {
              value += settings.decimal + new Array(settings.precision + 1).join(0);
            } else {
              // If the following decimal part dosen't have enough length against the precision, it needs to be filled with zeros.
              var integerPart = value.slice(0, decimalPointIndex),
                  decimalPart = value.slice(decimalPointIndex + 1);
              value = integerPart + settings.decimal + decimalPart + new Array(settings.precision + 1 - decimalPart.length).join(0);
            }
          } else if (decimalPointIndex > 0) {
            // if the precision is 0, discard the decimal part
            value = value.slice(0, decimalPointIndex);
          }

          $input.val(maskValue(value, settings));
        }

        function changeSign() {
          var inputValue = $input.val();

          if (settings.allowNegative) {
            if (inputValue !== "" && inputValue.charAt(0) === "-") {
              return inputValue.replace("-", "");
            } else {
              return "-" + inputValue;
            }
          } else {
            return inputValue;
          }
        }

        function preventDefault(e) {
          if (e.preventDefault) {
            //standard browsers
            e.preventDefault();
          } else {
            // old internet explorer
            e.returnValue = false;
          }
        }

        function fixMobile() {
          if ($.browser.device) {
            $input.attr("type", "tel");
          }
        }

        function keypressEvent(e) {
          e = e || window.event;
          var key = e.which || e.charCode || e.keyCode,
              decimalKeyCode = settings.decimal.charCodeAt(0); //added to handle an IE "special" event

          if (key === undefined) {
            return false;
          } // any key except the numbers 0-9. if we're using settings.reverse,
          // allow the user to input the decimal key


          if ((key < 48 || key > 57) && (key !== decimalKeyCode || !settings.reverse)) {
            return handleAllKeysExceptNumericalDigits(key, e);
          } else if (!canInputMoreNumbers()) {
            return false;
          } else {
            if (key === decimalKeyCode && shouldPreventDecimalKey()) {
              return false;
            }

            if (settings.formatOnBlur) {
              return true;
            }

            preventDefault(e);
            applyMask(e);
            return false;
          }
        }

        function shouldPreventDecimalKey() {
          // If all text is selected, we can accept the decimal
          // key because it will replace everything.
          if (isAllTextSelected()) {
            return false;
          }

          return alreadyContainsDecimal();
        }

        function isAllTextSelected() {
          var length = $input.val().length;
          var selection = getInputSelection(); // This should if all text is selected or if the
          // input is empty.

          return selection.start === 0 && selection.end === length;
        }

        function alreadyContainsDecimal() {
          return $input.val().indexOf(settings.decimal) > -1;
        }

        function applyMask(e) {
          e = e || window.event;
          var key = e.which || e.charCode || e.keyCode,
              keyPressedChar = "",
              selection,
              startPos,
              endPos,
              value;

          if (key >= 48 && key <= 57) {
            keyPressedChar = String.fromCharCode(key);
          }

          selection = getInputSelection();
          startPos = selection.start;
          endPos = selection.end;
          value = $input.val();
          $input.val(value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length));
          maskAndPosition(startPos + 1);
        }

        function handleAllKeysExceptNumericalDigits(key, e) {
          // -(minus) key
          if (key === 45) {
            $input.val(changeSign());
            return false; // +(plus) key
          } else if (key === 43) {
            $input.val($input.val().replace("-", ""));
            return false; // enter key or tab key
          } else if (key === 13 || key === 9) {
            return true;
          } else if ($.browser.mozilla && (key === 37 || key === 39) && e.charCode === 0) {
            // needed for left arrow key or right arrow key with firefox
            // the charCode part is to avoid allowing "%"(e.charCode 0, e.keyCode 37)
            return true;
          } else {
            // any other key with keycode less than 48 and greater than 57
            preventDefault(e);
            return true;
          }
        }

        function keydownEvent(e) {
          e = e || window.event;
          var key = e.which || e.charCode || e.keyCode,
              selection,
              startPos,
              endPos,
              value,
              lastNumber; //needed to handle an IE "special" event

          if (key === undefined) {
            return false;
          }

          selection = getInputSelection();
          startPos = selection.start;
          endPos = selection.end;

          if (key === 8 || key === 46 || key === 63272) {
            // backspace or delete key (with special case for safari)
            preventDefault(e);
            value = $input.val(); // not a selection

            if (startPos === endPos) {
              // backspace
              if (key === 8) {
                if (settings.suffix === "") {
                  startPos -= 1;
                } else {
                  // needed to find the position of the last number to be erased
                  lastNumber = value.split("").reverse().join("").search(/\d/);
                  startPos = value.length - lastNumber - 1;
                  endPos = startPos + 1;
                } //delete

              } else {
                endPos += 1;
              }
            }

            $input.val(value.substring(0, startPos) + value.substring(endPos, value.length));
            maskAndPosition(startPos);
            return false;
          } else if (key === 9) {
            // tab key
            return true;
          } else {
            // any other key
            return true;
          }
        }

        function focusEvent() {
          onFocusValue = $input.val();
          mask();
          var input = $input.get(0),
              textRange;

          if (!!settings.selectAllOnFocus) {
            input.select();
          } else if (input.createTextRange && settings.bringCaretAtEndOnFocus) {
            textRange = input.createTextRange();
            textRange.collapse(false); // set the cursor at the end of the input

            textRange.select();
          }
        }

        function cutPasteEvent() {
          setTimeout(function () {
            mask();
          }, 0);
        }

        function getDefaultMask() {
          var n = parseFloat("0") / Math.pow(10, settings.precision);
          return n.toFixed(settings.precision).replace(new RegExp("\\.", "g"), settings.decimal);
        }

        function blurEvent(e) {
          if ($.browser.msie) {
            keypressEvent(e);
          }

          if (!!settings.formatOnBlur && $input.val() !== onFocusValue) {
            applyMask(e);
          }

          if ($input.val() === "" && settings.allowEmpty) {
            $input.val("");
          } else if ($input.val() === "" || $input.val() === setSymbol(getDefaultMask(), settings)) {
            if (!settings.allowZero) {
              $input.val("");
            } else if (!settings.affixesStay) {
              $input.val(getDefaultMask());
            } else {
              $input.val(setSymbol(getDefaultMask(), settings));
            }
          } else {
            if (!settings.affixesStay) {
              var newValue = $input.val().replace(settings.prefix, "").replace(settings.suffix, "");
              $input.val(newValue);
            }
          }

          if ($input.val() !== onFocusValue) {
            $input.change();
          }
        }

        function clickEvent() {
          var input = $input.get(0),
              length;

          if (!!settings.selectAllOnFocus) {
            // selectAllOnFocus will be handled by
            // the focus event. The focus event is
            // also fired when the input is clicked.
            return;
          } else if (input.setSelectionRange && settings.bringCaretAtEndOnFocus) {
            length = $input.val().length;
            input.setSelectionRange(length, length);
          } else {
            $input.val($input.val());
          }
        }

        function doubleClickEvent() {
          var input = $input.get(0),
              start,
              length;

          if (input.setSelectionRange && settings.bringCaretAtEndOnFocus) {
            length = $input.val().length;
            start = settings.doubleClickSelection ? 0 : length;
            input.setSelectionRange(start, length);
          } else {
            $input.val($input.val());
          }
        }

        fixMobile();
        $input.unbind(".maskMoney");
        $input.bind("keypress.maskMoney", keypressEvent);
        $input.bind("keydown.maskMoney", keydownEvent);
        $input.bind("blur.maskMoney", blurEvent);
        $input.bind("focus.maskMoney", focusEvent);
        $input.bind("click.maskMoney", clickEvent);
        $input.bind("dblclick.maskMoney", doubleClickEvent);
        $input.bind("cut.maskMoney", cutPasteEvent);
        $input.bind("paste.maskMoney", cutPasteEvent);
        $input.bind("mask.maskMoney", mask);
      });
    }
  };

  function setSymbol(value, settings) {
    var operator = "";

    if (value.indexOf("-") > -1) {
      value = value.replace("-", "");
      operator = "-";
    }

    if (value.indexOf(settings.prefix) > -1) {
      value = value.replace(settings.prefix, "");
    }

    if (value.indexOf(settings.suffix) > -1) {
      value = value.replace(settings.suffix, "");
    }

    return operator + settings.prefix + value + settings.suffix;
  }

  function maskValue(value, settings) {
    if (settings.allowEmpty && value === "") {
      return "";
    }

    if (!!settings.reverse) {
      return maskValueReverse(value, settings);
    }

    return maskValueStandard(value, settings);
  }

  function maskValueStandard(value, settings) {
    var negative = value.indexOf("-") > -1 && settings.allowNegative ? "-" : "",
        onlyNumbers = value.replace(/[^0-9]/g, ""),
        integerPart = onlyNumbers.slice(0, onlyNumbers.length - settings.precision),
        newValue,
        decimalPart,
        leadingZeros;
    newValue = buildIntegerPart(integerPart, negative, settings);

    if (settings.precision > 0) {
      decimalPart = onlyNumbers.slice(onlyNumbers.length - settings.precision);
      leadingZeros = new Array(settings.precision + 1 - decimalPart.length).join(0);
      newValue += settings.decimal + leadingZeros + decimalPart;
    }

    return setSymbol(newValue, settings);
  }

  function maskValueReverse(value, settings) {
    var negative = value.indexOf("-") > -1 && settings.allowNegative ? "-" : "",
        valueWithoutSymbol = value.replace(settings.prefix, "").replace(settings.suffix, ""),
        integerPart = valueWithoutSymbol.split(settings.decimal)[0],
        newValue,
        decimalPart = "";

    if (integerPart === "") {
      integerPart = "0";
    }

    newValue = buildIntegerPart(integerPart, negative, settings);

    if (settings.precision > 0) {
      var arr = valueWithoutSymbol.split(settings.decimal);

      if (arr.length > 1) {
        decimalPart = arr[1];
      }

      newValue += settings.decimal + decimalPart;
      var rounded = Number.parseFloat(integerPart + "." + decimalPart).toFixed(settings.precision);
      var roundedDecimalPart = rounded.toString().split(settings.decimal)[1];
      newValue = newValue.split(settings.decimal)[0] + "." + roundedDecimalPart;
    }

    return setSymbol(newValue, settings);
  }

  function buildIntegerPart(integerPart, negative, settings) {
    // remove initial zeros
    integerPart = integerPart.replace(/^0*/g, ""); // put settings.thousands every 3 chars

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, settings.thousands);

    if (integerPart === "") {
      integerPart = "0";
    }

    return negative + integerPart;
  }

  $.fn.maskMoney = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (_typeof(method) === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery.maskMoney");
    }
  };
})(window.jQuery || window.Zepto);
