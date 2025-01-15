# Signed distance fields for various primitives
# The sample point (if applicable) is always the last 2 arguments

%include std/math

costumes "costumes/blank.svg";


%define SDF_PT(X1,Y1,PX,PY) sqrt((PX-X1)*(PX-X1)+(PY-Y1)*(PY-Y1))

%define SDF_LINE(X1,Y1,X2,Y2, PX,PY) ((X2-X1)*(Y1-PY) - (X1-PX)*(Y2-Y1)) / DIST(X1, Y1, X2, Y2)


# line
proc SDF_line x1, y1, x2, y2, px, py {
    dist = SDF_LINE($x1, $y1, $x2, $y2, $px, $py);
}


# line segment
proc SDF_line_segment x1, y1, x2, y2, px, py {
    len = DIST($x1, $y1, $x2, $y2);
    h = (($x2-$x1)*($px-$x1) + ($py-$y1)*($y2-$y1)) / len*len;
    if h < 0 {
        dist = DIST($x1, $y1, $px, $py);
    } elif h > 1 {
        dist = DIST($x2, $y2, $px, $py);
    } else {
        dist = abs(($x2-$x1)*($y1-$py) - ($x1-$px)*($y2-$y1)) / len;
    }
}



################################################################

onflag {
    hide;
    x = 1;
    y = 2;
    say SDF_PT(20, 30, x, y);
    say SDF_PT(20, 30, 1, 2);
    say SDF_LINE(-73, -75, 99, 65, x, y);
    say SDF_LINE(-73, -75, 99, 65, 1, 2);
    SDF_line -73, -75, 99, 65, 0, 0;
    SDF_line_segment -73, -75, 99, 65, 0, 0;
}
