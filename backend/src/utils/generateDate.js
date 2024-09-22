import moment from "moment-timezone";
function obtenerFechaHoraArgentinaFormateada() {
  moment.tz.setDefault("America/Argentina/Buenos_Aires");
  const fechaHoraArgentina = moment().format("YYYY-MM-DD HH:mm:ss");
  const partes = fechaHoraArgentina.split(" ");
  const fecha = partes[0];
  const hora = partes[1];
  return `${fecha} ${hora}`;
}
const fechaHoraActual = obtenerFechaHoraArgentinaFormateada();
export default fechaHoraActual;
