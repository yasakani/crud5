$(function() {
		
	// Lista de foros
	var foros = {
		salud:"Salud",
		familia:"Familia",
		deporte:"Deporte y Prevención de la Obesidad y Diabetes",
		equidad:"Equidad de Género",
		adultos:"Adultos Mayores",
		desarrollo:"Desarrollo Social y Cruzada contra el hambre"
	};
	
	// Elemento HTML para campos de Foro
	var foro_field = $(".foro");
	var foro_fields = '';
	
	// Recorremos Foros y creamos elementos HTMl para insertar en DOM
	for ( var i in foros) {
		
		console.log(i + ":" + foros[i]);
		
		foro_field.attr('for', i);
		foro_field.find('span').html(foros[i]);
		foro_field.find('input').attr('value', foros[i]);
		foro_field.find('input').attr('id', i);
		
		foro_fields = foro_fields + $('<div>').append( foro_field.clone() ).html();
		
	}
	
	console.log(foro_fields);
	
	// Eliminamos elemento base de opcion y agregamos elementos generados
	foro_field.remove();
	$("#forumsfields").append( foro_fields );
	
	// Capturamos envio de formulario para obtener datos y guardar en WebSQL
	$("#form_registro").submit(function(e) {
		
		// Creamos objeto con datos de formulario
		var datos = $(this).serializeArray();
		
		console.log(datos);
		
		// Guardamos datos en navegador
		guardaDatos(datos);
		
		// Limiamos elementos del formulario
		$(this).clearForm();
		
		// Mostramos mensaje de confirmación
		$("#msg").show().delay(5000).fadeOut();
		
		// Prevenimos envio de formulario especificando en el objeto del evento
		e.preventDefault();
		
	});
	
	// Mostramos datos
	getDataHtmlRows();
	
});

// Funcion que guarda datos en navegador con jStorage
function guardaDatos(datos) {
	
	console.log(datos);
	
	var key_from_name = datos[0].value + datos[1].value;
	var key_from_time = new Date().getTime();
	
	key_from_name = key_from_name.toString();
	key_from_name = key_from_name.toLowerCase();
	key_from_time = key_from_time.toString();
	
	var key = key_from_name + "_" + key_from_time;
	
	console.log(key_from_name);
	console.log(key_from_time);
	console.log(key);
	
	// Guardamos datos con ayuda de totalStorage
	var response = $.totalStorage(key, datos);
	
	// Agregamos nueva fila con datos de ultimo registro
	insertRowData(key);
	
}

// Para limpiar formulario de registro
function clear_form_elements(ele) {

    $(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });

}

// Para obtener los datos almacenados en localStorage
function getDataHtmlRows() {
	
	// Obtenemos objeto con datos de localStorage
	var data = localStorage;
	
	console.log(data);
	
	// Creamos objeto jQuery con elemento de fila en tabla
	var row = $("#stored-data table tbody tr");
	
	// Para crear conjunto de elementos de celdas
	var row_append = '';
	
	// Recorremos registro de datos
	for ( var i in data) {
		
		console.log(i);
		console.log(data[i]);
		
		var stored_data = eval('[' + data[i] + ']');
		stored_data = stored_data[0];
		
		console.log(stored_data);
		
		// Recuperamos datos de objeto
		var id = i;
		var ap_pater = ( "value" in stored_data[0] ) ? stored_data[0].value : '';
		var ap_mater = ( "value" in stored_data[1] ) ? stored_data[1].value : '';
		var nombre = ( "value" in stored_data[2] ) ? stored_data[2].value : '';
		var participacion = ( "value" in stored_data[3] ) ? stored_data[3].value : '';
		var domicilio = ( "value" in stored_data[4] ) ? stored_data[4].value : '';
		var telefono = ( "value" in stored_data[5] ) ? stored_data[5].value : '';
		var correo = ( "value" in stored_data[6] ) ? stored_data[6].value : '';
		var foro = ( "value" in stored_data[7] ) ? stored_data[7].value : '';
		
		row.find('.data-nombre').html(ap_pater + " " + ap_mater + " " + nombre);
		row.find('.data-domicilio').html(domicilio);
		row.find('.data-telefono').html(telefono);
		row.find('.data-correo').html(correo);
		row.find('.data-participacion').html(participacion);
		row.find('.data-foro').html(foro);
		
		row_append = row_append + $('<div>').append( row.clone() ).html();
		
	}
	
	console.log(row_append);
	
	// Inyectamos HTML en DOM para mostrar registros
	row.remove();
	$("#stored-data table tbody").html( row_append );
	
}

// Para obtener la ultima fila de datos insertada
function insertRowData(key) {
	
	var stored_data = $.totalStorage(key);
	
	// Creamos objeto jQuery con elemento de fila en tabla
	var row = $("#stored-data table tbody tr");
	
	// Recuperamos datos de objeto
	var id = i;
	var ap_pater = ( "value" in stored_data[0] ) ? stored_data[0].value : '';
	var ap_mater = ( "value" in stored_data[1] ) ? stored_data[1].value : '';
	var nombre = ( "value" in stored_data[2] ) ? stored_data[2].value : '';
	var participacion = ( "value" in stored_data[3] ) ? stored_data[3].value : '';
	var domicilio = ( "value" in stored_data[4] ) ? stored_data[4].value : '';
	var telefono = ( "value" in stored_data[5] ) ? stored_data[5].value : '';
	var correo = ( "value" in stored_data[6] ) ? stored_data[6].value : '';
	var foro = ( "value" in stored_data[7] ) ? stored_data[7].value : '';
	
	row.find('.data-nombre').html(ap_pater + " " + ap_mater + " " + nombre);
	row.find('.data-domicilio').html(domicilio);
	row.find('.data-telefono').html(telefono);
	row.find('.data-correo').html(correo);
	row.find('.data-participacion').html(participacion);
	row.find('.data-foro').html(foro);
	
	$("#stored-data table tbody").prepend(row);
	
}

