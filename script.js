document.addEventListener('DOMContentLoaded', () => {
    // Referencias del DOM
    const inputNumero = document.getElementById('numero-fibonacci');
    const btnGenerar = document.getElementById('btn-generar');
    const btnLimpiar = document.getElementById('btn-limpiar');
    const outputContainer = document.getElementById('output');
    const mensajeError = document.getElementById('mensaje-error');

    // Referencias de Estadísticas
    const statTotal = document.getElementById('stat-total');
    const statPares = document.getElementById('stat-pares');
    const statImpares = document.getElementById('stat-impares');
    const statSuma = document.getElementById('stat-suma');

    const MIN_VALOR = 1;
    const MAX_VALOR = 50;

    // --- Funciones Auxiliares ---

    const actualizarEstadisticas = (total, pares, impares, suma) => {
        statTotal.textContent = total;
        statPares.textContent = pares;
        statImpares.textContent = impares;
        statSuma.textContent = suma;
    };

    const limpiarError = () => {
        mensajeError.textContent = '';
        mensajeError.style.display = 'none';
    };
    
    const mostrarError = (mensaje) => {
        mensajeError.textContent = mensaje;
        mensajeError.style.display = 'block';
        outputContainer.innerHTML = '';
        actualizarEstadisticas(0, 0, 0, 0);
    };


    // --- Lógica Principal ---

    const generarSecuenciaFibonacci = () => {
        limpiarError();
        outputContainer.innerHTML = '';
        const N = +inputNumero.value;

        // Validar datos
        if (isNaN(N) || N < MIN_VALOR || N > MAX_VALOR) {
            let mensaje = `Por favor, ingrese un número válido entre ${MIN_VALOR} y ${MAX_VALOR}.`;
            mostrarError(mensaje);
            return;
        }
        
        // Función fibonacci y contadores
        const secuencia = [];
        let totalPares = 0;
        let totalImpares = 0;
        let sumaTotal = 0;

        if (N >= 1) secuencia.push(0);
        if (N >= 2) secuencia.push(1);

        for (let i = 2; i < N; i++) {
            const siguienteNumero = secuencia[i - 1] + secuencia[i - 2];
            secuencia.push(siguienteNumero);
        }

        // Mostrar la Secuencia en tarjetas 
    
        secuencia.forEach((numero, indice) => { 
            const tarjeta = document.createElement('div');
            const esPar = numero % 2 === 0;
            
            tarjeta.classList.add('fibonacci-card');
            
            if (esPar) {
                tarjeta.classList.add('par');
            } else {
                tarjeta.classList.add('impar');
            }

        
            const posicion = indice + 1; 

            tarjeta.innerHTML = `
                <p class="etiqueta-posicion">F(${posicion})</p>
                <p class="valor">${numero}</p>`;

            outputContainer.appendChild(tarjeta);
            
            // Actualizar contadores y suma
            sumaTotal += numero;
            if (esPar) {
                totalPares++;
            } else {
                totalImpares++;
            }
        });
        
        // Actualizar estadísticas al finalizar
        actualizarEstadisticas(N, totalPares, totalImpares, sumaTotal);
    };
    

    const limpiarOutput = () => {
        outputContainer.innerHTML = '';
        inputNumero.value = '';
        limpiarError();
        // Limpiar estadísticas
        actualizarEstadisticas(0, 0, 0, 0); 
    };

    // Inicializar estadísticas a 0 al cargar la página
    actualizarEstadisticas(0, 0, 0, 0); 

    // Asignar Eventos
    btnGenerar.addEventListener('click', generarSecuenciaFibonacci);
    btnLimpiar.addEventListener('click', limpiarOutput);
});