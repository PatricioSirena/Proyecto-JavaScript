function validarForm() {

    let nombre = document.getElementById('nombreInput').value;
    let codigo = document.getElementById('codigoInput').value;
    let categoria = document.getElementById('categoriaInput').value;
    let descripcion = document.getElementById('descripcionInput').value;

    if (nombre == "") {
        alert('Agregue el nombre');
        return false;
    }

    if (codigo == "") {
        alert('Agregue el codigo');
        return false;
    }

    if (categoria == "") {
        alert('Agregue la categoria');
        return false;
    }

    if (descripcion == "") {
        alert('Agregue la descripción');
        return false;
    }

    return true;
}


function mostrarInfo() {

    let listaJuegos;

    if (localStorage.getItem('listaJuegos') == null) {
        listaJuegos = [];
    } else {
        listaJuegos = JSON.parse(localStorage.getItem("listaJuegos"));
    }

    let html = "";

    listaJuegos.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.codigo + "</td>";
        html += "<td>" + element.categoria + "</td>";
        html += "<td>" + element.descripcion + "</td>";
        html += '<td><div class="text-center"><input type="checkbox"></div></td>';
        html += '<td><button onclick="borrarInfo(' + index + ')" class="btn btn-modal btn-dark">Eliminar dato</button> <button onclick="actualizarInfo(' + index + ')" class="btn btn-modal btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar dato</button></td>';
        html += "</tr>";
    });

    document.querySelector('#infoTabla tbody').innerHTML = html;
}


document.onload = mostrarInfo();

function agregarInfo() {
    if (validarForm() == true) {
        let nombre = document.getElementById('nombreInput').value;
        let codigo = document.getElementById('codigoInput').value;
        let categoria = document.getElementById('categoriaInput').value;
        let descripcion = document.getElementById('descripcionInput').value;

        let listaJuegos;
        if (localStorage.getItem('listaJuegos') == null) {
            listaJuegos = [];
        } else {
            listaJuegos = JSON.parse(localStorage.getItem("listaJuegos"));
        }

        listaJuegos.push({
            nombre: nombre,
            codigo: codigo,
            categoria: categoria,
            descripcion: descripcion
        });

        localStorage.setItem('listaJuegos', JSON.stringify(listaJuegos));

        mostrarInfo();

        document.getElementById('nombreInput').value = "";
        document.getElementById('codigoInput').value = "";
        document.getElementById('categoriaInput').value = "";
        document.getElementById('descripcionInput').value = "";
    }
}


function borrarInfo(index) {

    if (localStorage.getItem('listaJuegos') == null) {
        listaJuegos = [];
    } else {
        listaJuegos = JSON.parse(localStorage.getItem("listaJuegos"));
    }

    listaJuegos.splice(index, 1);
    localStorage.setItem('listaJuegos', JSON.stringify(listaJuegos));
    mostrarInfo();
}


function actualizarInfo(index) {
    document.getElementById("btnAgregar").style.display = 'none';
    document.getElementById("btnActualizar").style.display = 'inline';

    let listaJuegos;
    if (localStorage.getItem('listaJuegos') == null) {
        listaJuegos = [];
    } else {
        listaJuegos = JSON.parse(localStorage.getItem("listaJuegos"));
    }

    document.getElementById('nombreInput').value = listaJuegos[index].nombre;
    document.getElementById('codigoInput').value = listaJuegos[index].codigo;
    document.getElementById('categoriaInput').value = listaJuegos[index].categoria;
    document.getElementById('descripcionInput').value = listaJuegos[index].descripcion;

    document.querySelector("#btnActualizar").onclick = function () {
        if (validarForm() == true) {
            listaJuegos[index].nombre = document.getElementById('nombreInput').value;
            listaJuegos[index].codigo = document.getElementById('codigoInput').value;
            listaJuegos[index].categoria = document.getElementById('categoriaInput').value;
            listaJuegos[index].descripcion = document.getElementById('descripcionInput').value;

            localStorage.setItem('listaJuegos', JSON.stringify(listaJuegos));
            mostrarInfo();

            document.getElementById('nombreInput').value = "";
            document.getElementById('codigoInput').value = "";
            document.getElementById('categoriaInput').value = "";
            document.getElementById('descripcionInput').value = "";

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnUpdate", btnAdd).style.display = 'none';
        }
    };

    let refrescar = document.getElementById('btnCerrar');
    refrescar.addEventListener('click', e => {
        location.reload(e);
    })
}