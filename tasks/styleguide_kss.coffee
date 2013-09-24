kss = require "kss"
fs  = require "fs"
handlebars = require "handlebars"
module.exports = (grunt) ->
  grunt.registerMultiTask "ksstraverse", "compiled styleguide with hbs", () ->
    console.log "test", this.options()
    console.log "test", this.data.srcname

#    done = this.async()

#    #     generate there styleguide page
#    return console.log "Please input base path for grunt-ksstraverse options" if this.options().base == null
#    return console.log "Please input markdown for grunt-ksstraverse options" if this.options().markdown == null
#    return console.log "Please filename scss for grunt-ksstraverse options" if this.options().scssname == null
#    return console.log "Please input dst path and filename for grunt-ksstraverse options" if this.options().dstpath == null
#    return console.log "Please name for hbs template for grunt-ksstraverse options" if this.options().name == null
#
#    console.log("tut")
    done = this.async()

#    kss.traverse "#{__dirname}/"+this.options().base, { markdown: this.options().markdown }, (err, styleguide) ->
    kss.traverse "#{__dirname}/../src/scss", { markdown: false }, (err, styleguide) ->
      return console.log(err) if err
      sections = require('showcase').getSections(this.data.srcname, "#{__dirname}/views/sections", styleguide)
      source = fs.readFileSync("views/examples/" + this.options().name + ".hbs").toString()
      template = handlebars.compile(source);
      html = template(sections: sections)
      console.log "outputdir", this.options().dstpath + this.options().name + ".html"
      fs.writeFileSync(this.options().dstpath + this.options().name + ".html", html)
      done()
