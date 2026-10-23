// js/auth-guard.js
// Guardián para proteger páginas privadas y validar roles

async function verificarAccesoPorRol(rolRequerido) {
    // 1. Verificar si hay sesión activa
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (error || !session) {
        // Si no hay sesión, mandarlo al login principal
        window.location.href = '../index.html';
        return null;
    }

    // 2. Consultar el rol del usuario en la tabla perfiles_usuarios
    const { data: perfil, error: errPerfil } = await supabaseClient
        .from('perfiles_usuarios')
        .select('rol, nombre_completo')
        .eq('id', session.user.id)
        .single();

    if (errPerfil || !perfil) {
        alert("No se encontró un perfil autorizado para este usuario.");
        await supabaseClient.auth.signOut();
        window.location.href = '../index.html';
        return null;
    }

    // 3. Validar si el rol del usuario coincide con el permitido en la página
    if (rolRequerido && rolRequerido.length > 0 && !rolRequerido.includes(perfil.rol)) {
        alert("Acceso denegado: No cuenta con los permisos para este módulo.");
        // Redirigir según su rol correspondiente
        if (perfil.rol === 'docente') {
            window.location.href = '../docente/zonograma.html';
        } else {
            window.location.href = '../admin/dashboard.html';
        }
        return null;
    }

    return perfil; // Retorna los datos del usuario si pasó todas las pruebas
}