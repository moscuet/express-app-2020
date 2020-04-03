// const square = n => {
//   return n * n
// }
// const PI = Math.PI

// const printFullName = (firstName, lastName) => firstName + ' ' + lastName

// module.exports = {
//   square: square,
//   PI: PI,
//   printFullName: printFullName
// }

exports.square = n => {
  return n * n
}
exports.PI = Math.PI

exports.printFullName = (firstName, lastName) => firstName + ' ' + lastName

// Random Id generator
exports.randomId = (n = 6) => {
  const str = '0123456ABCDEFGHIJKLMNOPKRSTUVWXYZabcdefghihjklmnopqrstuvwxyz'
  let id = ''
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * str.length)
    id = id + str[index]
  }
  return id
}

// display time and date
exports.showDateTime = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const now = new Date()
  const year = now.getFullYear()
  const month = months[now.getMonth()]
  const date = now.getDate()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  const dateMonthYear = `${month} ${date}, ${year}`

  const time = hours + ':' + minutes
  const fullTime = dateMonthYear + ' ' + time
  return fullTime + `:${seconds}`
}



exports.students = [
  {
    firstName: 'Asab',
    lastName: 'Yeta',
    age: 250,
    country: 'Finland',
    skills: ['HTML', 'CSS', 'JS', 'React']
  },
  {
    firstName: 'Atik',
    lastName: 'Rhaman',
    age: 25,
    country: 'Finland',
    skills: ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Node']
  },
  {
    firstName: 'Bibek',
    lastName: 'Dhakal',
    age: 21,
    country: 'Finland',
    skills: ['HTML', 'CSS', 'JS', 'React', 'MongoDB']
  },
  {
    firstName: 'Arthur',
    lastName: 'Arthur',
    age: 25,
    country: 'Finland',
    skills: ['HTML', 'CSS', 'JS', 'React', 'Redux']
  }
]



exports.findIp=(ifaces) => {
  let ipAddress
  Object.keys(ifaces).forEach(function (ifname) {
    
    let count = 0;
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      
      if (count >= 1) {
        // this single interface has multiple ipv4 addresses
      ipAddress= iface.address;
      } else {
        // this interface has only one ipv4 adress
        ipAddress= iface.address;
      }
      ++count;
    });
  
  });
return ipAddress
}

