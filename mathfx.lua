function Math(elem)
  if elem.mathtype == "InlineMath" then
    return pandoc.RawInline("html", "\\(" .. elem.text .. "\\)")
  end
end
