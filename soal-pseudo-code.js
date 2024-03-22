// Expected input: Tidak ada input yang diperlukan.
// Expected output: Deret angka berkelipatan 5 dari 50 hingga 100 dengan keterangan sesuai kondisi.
function tampilkanDeret() {
  for (let i = 50; i <= 100; i += 5) {
    if (i <= 60) {
      console.log(`${i} KURANG`)
    } else if (i <= 70) {
      console.log(`${i} CUKUP`)
    } else if (i <= 80) {
      console.log(`${i} BAIK`)
    } else {
      console.log(`${i} LUAR BIASA`)
    }
  }
}
tampilkanDeret()

// Expected input: Tidak ada input yang diperlukan.
// Expected output: Deret bilangan Fibonacci sebanyak 20.
function fibonacci() {
  const fibSeries = [0, 1]
  for (let i = 2; i <= 20; i++) {
    fibSeries.push(fibSeries[i - 1] + fibSeries[i - 2])
  }
  console.log(fibSeries)
}
fibonacci()

// Expected input: x, integer yang menunjukkan jumlah baris yang ingin ditampilkan.
// Expected output: Tampilan bintang sesuai dengan variable x.
function tampilBerdasarkanX(num) {
  if (+num <= 0 || isNaN(+num)) {
    return 'Please enter a valid number.'
  }

  for (let i = 1; i <= +num; i++) {
    let stars = ''
    for (let j = 0; j < i; j++) {
      stars += '* '
    }
    console.log(stars)
  }
}
tampilBerdasarkanX(10)

// Expected input: x, bilangan integer dengan 4 digit (lebih besar dari 2000).
// Expected output: Terbilang dari bilangan integer tersebut.
function terbilang(n) {
  if (n.length < 4 || +n <= 2000 || isNaN(+n) || n.length > 4) {
    return 'Please enter a valid number.'
  }

  const num = n.toString()
  const bilanganMap = new Map([
    ['0', 'Nol'],
    ['1', 'Satu'],
    ['2', 'Dua'],
    ['3', 'Tiga'],
    ['4', 'Empat'],
    ['5', 'Lima'],
    ['6', 'Enam'],
    ['7', 'Tujuh'],
    ['8', 'Delapan'],
    ['9', 'Sembilan'],
  ])

  const ribuan = bilanganMap.get(num[0]) + ' Ribu '
  const ratusan = bilanganMap.get(num[1]) + ' Ratus '
  const puluhan = num[2] !== '0' ? bilanganMap.get(num[2]) + ' Puluh ' : ''
  const satuan = bilanganMap.get(num[3])

  return ribuan + ratusan + puluhan + satuan
}
console.log(terbilang(4321))
