"use client"
import * as React from "react"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Styles.css"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Banner() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )

    return (
        <>
            <div ref={sliderRef} className="keen-slider lg:h-[500px] h-[400px]">
                <div className="keen-slider__slide relative number-slide1">
                    <div className="h-full absolute w-full z-0 bg-black/80 opacity-35">

                    </div>
                    <div className="relative z-20">
                        <h2 className="text-4xl font-semibold">Delicious Meals, Delivered Fresh!</h2>
                        <Link href={'/login'}><Button>More</Button></Link>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide2">2</div>
                <div className="keen-slider__slide number-slide3">3</div>
                <div className="keen-slider__slide number-slide4">4</div>
                <div className="keen-slider__slide number-slide5">5</div>
                <div className="keen-slider__slide number-slide6">6</div>
            </div>
        </>
    )
}
