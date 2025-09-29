// Fix para forzar tema claro en diagramas Excalidraw
document.addEventListener('DOMContentLoaded', function() {
    // Función para aplicar el fix
    function fixExcalidrawTheme() {
        // Buscar todos los elementos que contengan diagramas Excalidraw
        const excalidrawElements = document.querySelectorAll('img[src$=".excalidraw"], .excalidraw, .excalidraw-wrapper, .excalidraw-container');
        
        excalidrawElements.forEach(element => {
            // Forzar fondo blanco
            element.style.backgroundColor = '#ffffff';
            element.style.background = '#ffffff';
            element.style.filter = 'none';
            
            // Si es un contenedor, aplicar también a sus hijos
            const children = element.querySelectorAll('*');
            children.forEach(child => {
                if (child.tagName === 'SVG' || child.tagName === 'CANVAS') {
                    child.style.backgroundColor = '#ffffff';
                    child.style.background = '#ffffff';
                    child.style.filter = 'none';
                }
            });
        });
        
        // Buscar SVGs específicos de Excalidraw
        const svgElements = document.querySelectorAll('svg');
        svgElements.forEach(svg => {
            // Verificar si es un SVG de Excalidraw (contiene elementos típicos)
            if (svg.querySelector('rect, text, path[stroke]')) {
                svg.style.backgroundColor = '#ffffff';
                svg.style.background = '#ffffff';
                
                // Asegurar que los trazos sean negros
                const paths = svg.querySelectorAll('path, rect, line, circle, ellipse');
                paths.forEach(path => {
                    if (path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none') {
                        path.setAttribute('stroke', '#000000');
                    }
                });
                
                // Asegurar que el texto sea negro
                const texts = svg.querySelectorAll('text');
                texts.forEach(text => {
                    text.setAttribute('fill', '#000000');
                    text.style.fill = '#000000';
                });
            }
        });
    }
    
    // Aplicar el fix inmediatamente
    fixExcalidrawTheme();
    
    // Aplicar el fix cuando cambie el tema
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'data-md-color-scheme' || 
                 mutation.attributeName === 'class')) {
                setTimeout(fixExcalidrawTheme, 100);
            }
        });
    });
    
    // Observar cambios en el elemento html y body
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme', 'class']
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme', 'class']
    });
    
    // Aplicar el fix periódicamente como respaldo
    setInterval(fixExcalidrawTheme, 2000);
});
