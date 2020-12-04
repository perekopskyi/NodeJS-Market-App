const fs = require('fs')
const path = require('path')

class Card {
  static async add(course) {
    const card = await Card.fetch()

    const idx = card.courses.findIndex((c) => c.id === course.id)
    const candidate = card.courses[idx]

    if (candidate) {
      // course already added
      candidate.count += 1
      card.courses[idx] = candidate
    } else {
      // course need add
      course.count = 1
      card.courses.push(course)
    }

    card.price += +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '../data/card.json'),
        JSON.stringify(card),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }

  static async remove(id) {
    const card = await Card.fetch()

    const idx = card.courses.findIndex((c) => c.id === id)
    const course = card.courses[idx]

    if (course.count === 1) {
      // delete course
      card.courses.filter((c) => c.id !== id)
    } else {
      // change count
      card.courses[idx].count -= 1
    }

    card.price -= course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '../data/card.json'),
        JSON.stringify(card),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(card)
          }
        }
      )
    })
  }
}

module.exports = Card
