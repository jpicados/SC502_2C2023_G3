const header = document.querySelector("header");
const footer = document.querySelector("footer");

header.innerHTML = `
<div>
<a href="index.html" class="logo">Intel Costa Rica</a> 
</div>
<nav class="navigation">
<ul>
  <li><a href="index.html">Inicio</a></li>
  <li><a href="empleados.html">Empleados</a></li>
  <li><a href="veractivos.html">Activos</a>
    <ul>
      <li>
        <a href="agregaractivo.html">Agregar activos</a>
          </form>
        </div>
      </li>
      <li><a href="veractivos.html">Ver activos </a></li>
      <li><a href="buscaractivo.html">Buscar</a></li>
    </ul>
  </li>
  <li><a href="#">Movimientos</a>
  <li><a href="#">Perfil</a></li>
  <li><a href="usuarios.html">Usuarios</a>
  </li>
  <li><a href="login.html">Cerrar Sesion</a></li>
</ul>
</nav>
`;

footer.innerHTML = `
<div class="footer-info">
<div class="contact-info">
  <h3>Contacto</h3>
  <p><strong>Teléfono:</strong>  (+506) 2298-6000</p>
  <p><strong>Dirección:</strong> Componentes Intel de Costa Rica Calle 129 La Ribera de Belen Heredia, Costa Rica</p>
</div>
<div class="social-media">
  <h3>Redes Sociales</h3>
  <div class="social-icons">
    <a href="#"><img src="../img/Logo_de_Facebook.png" alt="Facebook"></a>
    <a href="#"><img src="../img/twitter-icon-free-png.webp" alt="Twitter"></a>
    <a href="#"><img src="../img/instagram-icon.png" alt="Instagram"></a>
  </div>
</div>
</div>
<p>© 2023 Intel Costa Rica. Todos los derechos reservados.</p>
`;
