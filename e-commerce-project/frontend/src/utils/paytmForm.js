// Verifica si el valor proporcionado es una fecha.
function isDate(val) {
    // Compatible entre distintos entornos de ejecución.
    return Object.prototype.toString.call(val) === '[object Date]';
}

// Verifica si el valor proporcionado es un objeto.
function isObj(val) {
    return typeof val === 'object';
}

// Convierte el valor en una cadena JSON si es un objeto, excluyendo las fechas.
function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val); // Convierte a JSON si es un objeto.
    } else {
        return val; // Devuelve el valor directamente si no es un objeto.
    }
}

// Construye un formulario HTML dinámicamente basado en los parámetros proporcionados.
function buildForm({ action, params }) {
    const form = document.createElement('form'); // Crea un elemento de formulario.
    form.setAttribute('method', 'post'); // Establece el método HTTP como POST.
    form.setAttribute('action', action); // Establece la URL de destino del formulario.

    // Recorre los parámetros y crea un campo de entrada oculto por cada uno.
    Object.keys(params).forEach(key => {
        const input = document.createElement('input'); // Crea un campo de entrada.
        input.setAttribute('type', 'hidden'); // Lo define como oculto.
        input.setAttribute('name', key); // Establece el nombre del campo.
        input.setAttribute('value', stringifyValue(params[key])); // Establece el valor convertido.
        form.appendChild(input); // Añade el campo al formulario.
    });

    return form; // Devuelve el formulario creado.
}

// Envía un formulario POST con los detalles especificados.
export function post(details) {
    const form = buildForm(details); // Construye el formulario.
    document.body.appendChild(form); // Añade el formulario al documento.
    form.submit(); // Envía el formulario.
    form.remove(); // Elimina el formulario del documento.
}
