#!/bin/bash

# Script para hacer push a GitHub usando Personal Access Token
# Uso: ./git-push.sh [mensaje-de-commit]

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [opciones] [mensaje-de-commit]"
    echo ""
    echo "Opciones:"
    echo "  -h, --help     Mostrar esta ayuda"
    echo "  -t, --token    Configurar token (se pedirá de forma segura)"
    echo "  -s, --status   Solo mostrar git status"
    echo ""
    echo "Ejemplos:"
    echo "  $0 \"Mi mensaje de commit\""
    echo "  $0 --token"
    echo "  $0 --status"
    echo ""
    echo "Token:"
    echo "  El script busca tu GitHub token en el archivo .token"
    echo "  También puedes crearlo manualmente: echo 'tu_token' > .token"
}

# Función para configurar token de forma segura
configure_token() {
    echo -e "${YELLOW}Configurando Personal Access Token de GitHub...${NC}"
    echo "Por favor ingresa tu token (no se mostrará en pantalla):"
    read -s token
    
    if [ -z "$token" ]; then
        echo -e "${RED}Error: No se ingresó ningún token${NC}"
        exit 1
    fi
    
    # Guardar en archivo .token en el directorio del proyecto
    echo "$token" > .token
    chmod 600 .token
    
    echo -e "${GREEN}Token configurado correctamente${NC}"
    echo "El token se guardó en .token (agregado al .gitignore para seguridad)"
    
    # Verificar que está en .gitignore
    if ! grep -q ".token" .gitignore 2>/dev/null; then
        echo -e "${YELLOW}¡ADVERTENCIA!${NC} .token no está en .gitignore"
        echo "Se recomienda agregarlo para evitar subirlo accidentalmente"
    fi
}

# Función para verificar si existe el token
check_token() {
    if [ ! -f .token ]; then
        echo -e "${YELLOW}No se encontró archivo .token${NC}"
        echo "Opciones:"
        echo "1. Ejecuta: $0 --token (para configurarlo interactivamente)"
        echo "2. Crea manualmente el archivo .token y pon tu GitHub token ahí"
        exit 1
    fi
    
    # Verificar que el archivo no esté vacío
    if [ ! -s .token ]; then
        echo -e "${RED}El archivo .token está vacío${NC}"
        echo "Agrega tu GitHub Personal Access Token al archivo .token"
        exit 1
    fi
}

# Función para hacer push con token
git_push_with_token() {
    local commit_msg="$1"
    
    # Verificar que existe el token
    check_token
    
    # Leer el token desde .token
    local token=$(cat .token | tr -d '\n\r')
    
    # Verificar que hay cambios
    if git diff --quiet && git diff --cached --quiet; then
        echo -e "${YELLOW}No hay cambios para commitear${NC}"
        exit 0
    fi
    
    # Mostrar status
    echo -e "${YELLOW}Estado actual del repositorio:${NC}"
    git status --short
    echo ""
    
    # Confirmar si proceder
    echo -e "${YELLOW}¿Deseas continuar con el commit y push? (y/N)${NC}"
    read -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Operación cancelada"
        exit 0
    fi
    
    # Add todos los cambios
    echo -e "${YELLOW}Agregando archivos...${NC}"
    git add -A
    
    # Commit
    if [ -z "$commit_msg" ]; then
        commit_msg="Update: $(date '+%Y-%m-%d %H:%M')"
    fi
    
    echo -e "${YELLOW}Haciendo commit: $commit_msg${NC}"
    git commit -m "$commit_msg"
    
    # Configurar credenciales temporalmente usando el token
    echo -e "${YELLOW}Configurando credenciales temporales...${NC}"
    git config --local credential.helper 'cache --timeout=3600'
    
    # Push usando expect para automatizar la entrada de credenciales
    echo -e "${YELLOW}Haciendo push a GitHub...${NC}"
    
    # Crear script temporal para automatizar credenciales
    cat > /tmp/git-push-expect.sh << EOF
#!/bin/bash
export GIT_ASKPASS='echo'
export GIT_USERNAME='e7canasta'
export GIT_PASSWORD='$token'

# Usar git con las credenciales en la URL temporalmente
git push https://e7canasta:$token@github.com/e7canasta/reddit-clone.git master
EOF
    
    chmod +x /tmp/git-push-expect.sh
    
    if /tmp/git-push-expect.sh; then
        echo -e "${GREEN}✅ Push exitoso!${NC}"
        echo -e "${GREEN}Cambios subidos a: https://github.com/e7canasta/reddit-clone${NC}"
    else
        echo -e "${RED}❌ Error en el push${NC}"
        exit 1
    fi
    
    # Limpiar script temporal
    rm -f /tmp/git-push-expect.sh
    
    # Limpiar configuración de credenciales locales
    git config --local --unset credential.helper
}

# Función para mostrar solo status
show_status() {
    echo -e "${YELLOW}Estado del repositorio:${NC}"
    git status
    echo ""
    echo -e "${YELLOW}Archivos modificados:${NC}"
    git diff --name-status
}

# Main script
case "$1" in
    -h|--help)
        show_help
        ;;
    -t|--token)
        configure_token
        ;;
    -s|--status)
        show_status
        ;;
    *)
        # Push con mensaje de commit opcional
        git_push_with_token "$1"
        ;;
esac