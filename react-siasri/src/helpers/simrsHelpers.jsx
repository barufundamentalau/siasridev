// Fungsi untuk menentukan judul berdasarkan ID dengan tambahan zona waktu
export const getTitle = (id) => {
  const now = new Date()

  switch (id) {
    case '1': {
      // Mendapatkan nama hari ini
      const options = { weekday: 'long', timeZone: 'Asia/Makassar' } // WITA
      return `HARI ${now.toLocaleDateString('id-ID', options)}`
    }
    case '2': {
      // Mendapatkan nama bulan ini
      const options = { month: 'long', timeZone: 'Asia/Makassar' } // WITA
      return `BULAN ${now.toLocaleDateString('id-ID', options)}`
    }
    case '3': {
      // Mendapatkan tahun ini
      return `TAHUN ${now.getFullYear().toString()}`
    }
    default:
      return `ID: ${id}`
  }
}
