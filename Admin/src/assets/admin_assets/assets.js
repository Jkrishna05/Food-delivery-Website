// Public folder assets - these will be served directly from /public/assets/
export const assets = {
    logo: '/assets/logo.png',
    add_icon: '/assets/add_icon.png',
    order_icon: '/assets/order_icon.png',
    profile_image: '/assets/profile_image.png',
    upload_area: '/assets/upload_area.png',
    parcel_icon: '/assets/parcel_icon.png'
}

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'