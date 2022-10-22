# What it is
**Simple Screenshot** is a Firefox extension that can make a screenshot of whole html page.
It is (will be) created because I did not find any screenshot extension that can make a full page screenshot of
a really big page
due to Firefox [bug1784915](https://bocoransoal.online/pendidikan-https-bugzilla.mozilla.org/show_bug.cgi?id=1784915).

# How it works
1. Make page small screenshots, convert to blob
2. Join these screenshot blobs
3. Convert it to tga format because converting to PNG or JPEG demands to implement complex algorithm
4. Use pngjs lib to convert tga to png

# FYI
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#maximum_canvas_size

# Firefox Bug to avoid
* https://bocoransoal.online/pendidikan-https-bugzilla.mozilla.org/show_bug.cgi?id=1784915
* https://bugs.chromium.org/p/skia/issues/detail?id=2122

# External
https://github.com/lukehaas/css-loaders