export default () => {
    const isOpen = ref(false)
    const toggleModal = () => {
        isOpen.value = !isOpen.value
    }

    return {
        isOpen, 
        toggleModal
    }
}