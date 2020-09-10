import Swal from "sweetalert2";

const notice = (title, icon) => {
    Swal.fire({
        position: 'center',
        icon,
        title,
        showConfirmButton: false,
        timer: 1500
    })
}

export default notice
