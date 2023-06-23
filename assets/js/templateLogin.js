const menu = document.getElementById("header");
const pie = document.getElementById("footer");

menu.innerHTML =`
<div class=" navbarLogin">
<div class="Intel">
  <nav>
    <h2 class="Logo"> Intel <span>Corporation</span></h2>
   
  </nav>
`;
/*
Quite esto ya que lo siento innecesario 
Tambien cambie un poco lo que es el css, hice el form mas pequenno
Y el tecto de Intel Corporation mas grande.
 <ul>
      <li><a href="#">Mision</a></li>
      <li><a href="#">Vison</a></li>
      <li><a href="#">Contactanos</a></li>
    </ul>
    <button class="BtnNav">Registrarse</button>
    */

pie.innerHTML = `
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