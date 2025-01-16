# Signed distance fields for various primitives
# The sample point (if applicable) is always the last 2 arguments

%include std/math

costumes "costumes/blank.svg";


# Point
%define SDF_PT(X,Y,PX,PY) sqrt(((PX)-(X))*((PX)-(X))+((PY)-(Y))*((PY)-(Y)))

func SDF_point(x, y, px, py) {
    return SDF_PT($x, $y, $px, $py);
}


# Line (infinite length)
%define SDF_LINE(X1,Y1,X2,Y2, PX,PY) (((X2)-(X1))*((Y1)-(PY)) - ((X1)-(PX))*((Y2)-(Y1))) / DIST(X1, Y1, X2, Y2)

func SDF_line(x1, y1, x2, y2, px, py) {
    return SDF_LINE($x1, $y1, $x2, $y2, $px, $py);
}


# Line segment
func SDF_line_segment(x1, y1, x2, y2, px, py) {
    len = DIST($x1, $y1, $x2, $y2);
    h = (($x2-$x1)*($px-$x1) + ($py-$y1)*($y2-$y1)) / len*len;
    if h < 0 {
        return DIST($x1, $y1, $px, $py);
    } elif h > 1 {
        return DIST($x2, $y2, $px, $py);
    } else {
        return abs(($x2-$x1)*($y1-$py) - ($x1-$px)*($y2-$y1)) / len;
    }
}



# Bezier curve, quadratic
# https://scratch.mit.edu/projects/759290178/
func SDF_bezier_quadratic(ax, ay, bx, by, cx, cy, px, py) {
    %define SQM(VX,VY) (((VX)*(VX))+((VY)*(VY)))
    %define CBRT(X) antiln(ln(abs(X))/3)
    %define SIGN(VALUE) ((VALUE) / abs(VALUE))

    a_x = $bx-$ax;
    a_y = $by-$ay;
    b_x = ($ax - 2*$bx) + $cx;
    b_y = ($ay - 2*$by) + $cy;
    c_x = a_x * 2;
    c_y = a_y * 2;
    d_x = $ax-$px;
    d_y = $ay-$py;
    
    kk = 1 / SQM(b_x, b_y);

    kx = kk * (a_x*b_x + a_y*b_y);
    ky = (kk * (2*SQM(a_x, a_y) + (b_x*d_x + a_y*d_y))) / 3;

    p = ky - (kx * kx);
    q = (kx * (2*kx*kx - 3*ky)) + (kk * (d_x*a_x + d_y*a_y));
    h = q*q + 4*p*p*p;
    
    if ( h < 0) { 
        x_x = (sqrt(h)-q)/2;
        x_y = (-sqrt(h)-q)/2;

        t = ((SIGN(x_x) * CBRT(x_x)) + (SIGN(x_y) * CBRT(x_y))) - kx;
        # t is actually a useful secondary return value, that's why this is here 
        if t > 1 {
            t = 1;
        } elif t < 0 {
            t = 0;
        }
        return SQM(d_x+((c_x+(b_x*t))*t), d_y+((c_y+(b_y*t))*t));
    } else {
        # todo
        v = acos(q/(p*sqrt(abs(p))*2)) / 3;
        t_x = (2 * cos(v) * sqrt(abs(p))) - kx;
        t_y = ((sin(v) * -1.732050808) - cos(v)) * sqrt(abs(p)) - kx;

        if t_x > 1 {
            t_x = 1;
        } elif t_x < 0 {
            t_x = 0;
        }
        
        if t_y > 1 {
            t_y = 1;
        } elif t_y < 0 {
            t_y = 0;
        }

        res_a = SQM(d_x+((c_x+(b_x*t_x))*t_x), d_y+((c_y+(b_y*t_x))*t_x));
        res_b = SQM(d_x+((c_x+(b_x*t_y))*t_y), d_y+((c_y+(b_y*t_y))*t_y));

        if res_a < res_b {
            t = t_x;
            return sqrt(res_a);
        }
        t = t_y;
        return sqrt(res_b);
    }
    
    %undef SQM
    %undef CBRT
    %undef SIGN
}


################################################################

onflag {
    hide;
    x = 1;
    y = 2;
    if false {
        say SDF_PT(20, 30, x, y);
        say SDF_PT(20, 30, 1, 2);
        say SDF_LINE(-73, -75, 99, 65, x, y);
        say SDF_LINE(-73, -75, 99, 65, 1, 2);
    }
    say "...";
    say SDF_point(20, 30, 1, 2);
    say SDF_line(-73, -75, 99, 65, 0, 0);
    say SDF_line_segment(-73, -75, 99, 65, 0, 0);
    say SDF_bezier_quadratic(110, 110, 120, 10, 140, 150, 0, 0);
}
