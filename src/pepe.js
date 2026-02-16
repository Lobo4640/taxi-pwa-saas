// Configuración de Supabase (Pégalo de tu archivo .env)
const supabaseUrl = 'TU_URL_DE_SUPABASE';
const supabaseKey = 'TU_LLAVE_ANON_DE_SUPABASE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function cargarConfiguracion() {
    // 1. Detectar el subdominio
    const host = window.location.hostname;
    const subdominio = host.split('.')[0]; 

    // 2. Consultar la base de datos
    const { data, error } = await supabase
        .from('clientes_taxi')
        .select('*')
        .eq('subdominio', subdominio)
        .single();

    if (error) {
        console.error("Error cargando cliente:", error);
        return;
    }

    // 3. Aplicar los cambios al diseño automáticamente
    document.getElementById('nombre-comercial').innerText = data.nombre_comercial;
    
    // Cambiar el color del botón dinámicamente
    const boton = document.getElementById('btn-reservar');
    boton.style.background = `linear-gradient(to right, ${data.color_primario}, ${data.color_acento})`;
    
    // Guardar precios en memoria para el cálculo posterior
    window.tarifaBase = data.tarifa_base;
    window.precioKm = data.precio_km;
}

cargarConfiguracion();