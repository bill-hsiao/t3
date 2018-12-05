function name(methods) {
  function output(string) {
    const display = {
        line: document.getElementById('name_output_line'),
        value: ""
    }
    display.value = string;
    display.line.textContent = display.value;
    //methods(string);
    return display.value

  }

  (function () {
    const form = {
      root: document.getElementById('name_input'),
      field: document.getElementById('name_input_field'),
      // submit: document.getElementById('name_input_submit'),
      value: ""
    }

    form.field.addEventListener('keydown', function(evt) {
      form.value = evt.target.value;
      form.field.value = evt.target.value;
      if (evt.which == 13 || event.keyCode == 13) {
        (function() {
          form.root.classList.add('hidden')
          form.field.classList.add('hidden')
          output(form.value)
        })();
      }
    });

    // form.submit.addEventListener('click', function() {
    //   form.root.classList.add('hidden')
    //   output(form.value)
    // });

    return form.value;
  })();
}

module.exports = name
