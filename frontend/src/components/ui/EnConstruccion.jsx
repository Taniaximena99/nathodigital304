import { Link } from "react-router-dom";

export default function EnConstruccion(){
    return (
        <section className="mx-auto max max-w-2x1 px-4 py-24 text-center">
            <p className="text-5x1" aria-hidden="true"></p>
            <h1 className="mt-4 text-3xl font-extrabold">Estamos construyendo esta sección</h1>
            <p className="mt-3 text-carbon/80">Este modulo lo esta programando otro equipo, ¡vuelve pronto!</p>
            <Link to="/" className="mt-8 inline-block rounded-full bg-maiz px-3 front-extrabold text-carbon hover:bg-maiz/80">
            Regresa al inicio
            </Link>
        </section>
    )
}