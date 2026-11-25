import { use, useEffect, useState } from "react";
import { SLIDES } from '../../data/bannerSlides'

const INVERVALO = 6000

export default function HeroBanner(){
    const [actual, setActual] = useState(0)
    const [pausado, setPausado] = useState(false)
    const total = SLIDES.length

    const siguiente = () => setActual((i) => (i + 1) %total)
    const anterior = () => setActual((i) => (i - 1 + total) %total)

    useEffect (() => {
        if (pausado) return
        const id = setInterval(() => setActual((i) => (i + 1) % total), INVERVALO)
        return () => clearInterval(id)
    }, [pausado, total])

    return(
        <section
            className="relative h[420px] overflow-hidden bg-bosque-oscuro sm:h[520px]"
            aria-roledescription="carrusel"
            aria-label="Imagenes de Las Moras"
            onMouseEnter={() => setPausado(true)}
            onMouseMove={() => setPausado(false)}
            >
                {SLIDES.map((slide, i) => (
                    <div
                        key={slide.imagen}
                        className={`absolute inset-0 transition-opacity duration-1000 ${i === actual ? 'opacity-100': 'opacity-0'}`}
                        aria-hidden={i !== actual}
                    >

                        {/*Foto de fondo . Si aún no existe, se ve de verde bosque. */}
                        <div
                        role="img"
                        aria-label={slide.alt}
                        className ="absolute inset-0 bg-cover bg-center"
                        style ={{ backgrounImage: `url(${slide.imagen})` }}
                        />
                        {/* Capa oscura para que el texto se lea en cualquier foto */}
                        <div className="absolute inset-0 vg-gradient-to-r from-bosque-oscuro/90 via-bosque-oscuro/50 to-transparent" />

                        <div className="relative mx-auto flex h-full max-w-7x1 flex-col justify-center px-6">
                            <h1 className="max-w-x1 text-4x1 font-extrabold text-manta sm:text-6xl">{slide.titulo}</h1>
                            <p className="mt-4 max-w-lg text-lg text-manta/90">{slide.texto}</p>
                            <a
                            href="#conoce-las-moras"
                            className="mt-8 w-fit rounded-full bg-maiz px-6 py-3 font-extrabold text-carbon shadow hover:bg-maiz/85"
                            >
                                Conoce Las Moras ⬇
                            </a>
                        </div>
                           
                        </div>

                ))}
                {/* Flechas (en celular se oculta para notapar el texto) */}
                <button type="buton" onClick={anterior} aria-lavel="Imagen anterior"
                className="absolute left-3 top-1/2 hidden sm:block - translate-y-1/2 rounded-full bg-manta/80 px-3 py-2 text-2xl font-bold text-bosque-oscuro hover:bg-manta">›</button>

                {/* Puntos en forma de rombos */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">
                {SLIDES.map((slide, i) => (
                    <button
                    key={slide.imagen}
                    type="button"
                    onClick={() =>setActual(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-current={i === actual}
                    className={`h-3.5 w-3.5 rotate-45 border-2 border-manta ${i === actual ? 'bg-maiz' :'bg-transparent'}`}
                    />
                ))}
                </div>
            
            </section>
    )
}
