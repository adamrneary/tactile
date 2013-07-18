class Tactile.FixturesTime

  constructor: ->
    @tzOffset = new Date().getTimezoneOffset() * 60
    @months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]

    @units =  [
      # seconds: [time_in_milliseconds]
      name: "decade"
      seconds: 86400000 * 365.25 * 10
      formatter: (d) ->
        parseInt(d.getUTCFullYear() / 10) * 10
    ,
      name: "year"
      seconds: 86400000 * 365.25
      formatter: (d) ->
        d.getUTCFullYear()
    ,
      name: "month"
      seconds: 86400000 * 30.5
      formatter: (d) =>
        @months[d.getUTCMonth()]
    ,
      name: "week"
      seconds: 86400000 * 7
      formatter: (d) =>
        @formatDate d
    ,
      name: "day"
      seconds: 86400000
      formatter: (d) ->
        d.getUTCDate()
    ,
      name: "6 hour"
      seconds: 3600000 * 6
      formatter: (d) =>
        @formatTime d
    ,
      name: "hour"
      seconds: 3600000
      formatter: (d) =>
        @formatTime d
    ,
      name: "15 minute"
      seconds: 60000 * 15
      formatter: (d) =>
        @formatTime d
    ,
      name: "minute"
      seconds: 60000
      formatter: (d) ->
        d.getUTCMinutes()
    ,
      name: "15 second"
      seconds: 15000
      formatter: (d) ->
        d.getUTCSeconds() + "s"
    ,
      name: "second"
      seconds: 1000
      formatter: (d) ->
        d.getUTCSeconds() + "s"
    ]

  unit: (unitName) ->
    @units.filter((unit) ->
      unitName is unit.name
    ).shift()

  formatDate: (d) ->
    d.toUTCString().match(/, (\w+ \w+ \w+)/)[1]

  formatTime: (d) ->
    d.toUTCString().match(/(\d+:\d+):/)[1]

  ceil: (time, unit) ->
    if unit.name is "year"
      nearFuture = new Date((time + unit.seconds - 1))
      rounded = new Date(0)
      rounded.setUTCFullYear nearFuture.getUTCFullYear()
      rounded.setUTCMonth 0
      rounded.setUTCDate 1
      rounded.setUTCHours 0
      rounded.setUTCMinutes 0
      rounded.setUTCSeconds 0
      rounded.setUTCMilliseconds 0
      return rounded.getTime()
    if unit.name is "month"
      nearFuture = new Date((time + unit.seconds - 1))
      rounded = new Date(0)
      rounded.setUTCFullYear nearFuture.getUTCFullYear()
      rounded.setUTCMonth nearFuture.getMonth()
      rounded.setUTCDate 1
      rounded.setUTCHours 0
      rounded.setUTCMinutes 0
      rounded.setUTCSeconds 0
      rounded.setUTCMilliseconds 0
      return rounded.getTime()
    Math.ceil(time / unit.seconds) * unit.seconds
