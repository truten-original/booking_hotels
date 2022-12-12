export const getStringDate = (msDate) => {
    const strDate = new Date(msDate)
    return strDate.toLocaleDateString()
}