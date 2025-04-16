"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Datos de ejemplo de actores de cine
const datosEjemploActores = [
  "Antonio Banderas",
  "Penélope Cruz",
  "Javier Bardem",
  "Salma Hayek",
  "Gael García Bernal",
  "Diego Luna",
  "Pedro Almodóvar",
  "Ricardo Darín",
  "Eugenio Derbez",
  "Paz Vega",
  "Mario Casas",
  "Sofía Vergara",
  "Luis Tosar",
  "Maribel Verdú",
  "Guillermo del Toro",
];

export default function Home() {
  const [elementos, setElementos] = useState<string>("");
  const [elementoSeleccionado, setElementoSeleccionado] = useState<string | null>(null);
  const [estaAnimando, setEstaAnimando] = useState<boolean>(false);
  
  const cargarDatosEjemplo = () => {
    setElementos(datosEjemploActores.join("\n"));
    setElementoSeleccionado(null);
  };
  
  const reiniciarTodo = () => {
    setElementos("");
    setElementoSeleccionado(null);
  };

  const seleccionarAleatorio = () => {
    // Dividir los elementos por nueva línea y filtrar líneas vacías
    const listaElementos = elementos
      .split("\n")
      .map(elemento => elemento.trim())
      .filter(elemento => elemento.length > 0);

    if (listaElementos.length === 0) {
      setElementoSeleccionado("¡Por favor, ingresa algunos elementos primero!");
      return;
    }

    // Iniciar animación
    setEstaAnimando(true);
    
    // Simular animación ciclando rápidamente entre elementos
    let contador = 0;
    const ciclosTotales = 20;
    const intervalo = setInterval(() => {
      const indiceAleatorio = Math.floor(Math.random() * listaElementos.length);
      setElementoSeleccionado(listaElementos[indiceAleatorio]);
      contador++;
      
      if (contador >= ciclosTotales) {
        clearInterval(intervalo);
        setEstaAnimando(false);
        // Selección final
        const indiceFinal = Math.floor(Math.random() * listaElementos.length);
        setElementoSeleccionado(listaElementos[indiceFinal]);
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-2xl">

        <Card className="w-full shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Image 
                src="/randompick-logo.svg" 
                alt="Logo de Selector Aleatorio" 
                width={40} 
                height={40} 
                className="dark:filter dark:invert-[0.8]"
              />
              <CardTitle className="text-2xl md:text-3xl">Selector Aleatorio</CardTitle>
            </div>
            <CardDescription className="text-center">Ingresa elementos (uno por línea) y haz clic en el botón para seleccionar uno al azar</CardDescription>
            <p className="text-xs text-center text-muted-foreground mt-1">Tus datos son privados - nada se guarda ni se rastrea</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ingresa elementos aquí, uno por línea"
              className="min-h-[200px] font-mono"
              value={elementos}
              onChange={(e) => setElementos(e.target.value)}
            />
            
            {elementoSeleccionado && (
              <Card className={`mt-4 overflow-hidden ${estaAnimando ? 'animate-pulse' : ''}`}>
                <CardContent className="p-4">
                  <h3 className="text-center text-lg font-semibold mb-2">Elemento Seleccionado:</h3>
                  <div className="bg-muted p-4 rounded-md text-center font-medium text-xl break-words shadow-inner">
                    {elementoSeleccionado}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3">
            <Button 
              onClick={seleccionarAleatorio} 
              className="w-full transition-all" 
              size="lg"
              disabled={estaAnimando}
            >
              {estaAnimando ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Seleccionando...
                </span>
              ) : "Seleccionar al Azar"}
            </Button>
            
            <div className="flex gap-3 w-full">
              <Button 
                onClick={cargarDatosEjemplo} 
                className="flex-1" 
                variant="outline"
                disabled={estaAnimando}
              >
                Cargar Ejemplos
              </Button>
              
              <Button 
                onClick={reiniciarTodo} 
                className="flex-1" 
                variant="outline"
                disabled={estaAnimando}
              >
                Reiniciar Todo
              </Button>
            </div>
            

          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6 mb-2 flex items-center gap-1">
        <a 
          href="https://github.com/randompicker" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Ver código en GitHub"
        >
          <Image src="/github.svg" alt="GitHub" width={24} height={24} className="dark:invert" />
        </a>
        <div className="text-sm text-muted-foreground">
          <span className="hover:text-foreground transition-colors">
            Selector Aleatorio 2025
          </span>
        </div>
      </div>
    </div>
  );
}
