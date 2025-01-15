# Render various shapes

%include std/math

costumes "costumes/blank.svg";


# Draw a line segment using 2 points
proc draw_line x1, y1, x2, y2 {
    goto $x1, $y1;
    pen_down;
    goto $x2, $y2;
    pen_up;
}

# Draw a broken line segment
proc draw_line_broken x1, y1, x2, y2, spacing {
    len = DIST($x1, $y1, $x2, $y2);
    t = 0;
    repeat floor(len/(2*$spacing)) {
        goto $x1 + t*($x2-$x1)/len, $y1 + t*($y2-$y1)/len;
        pen_down;
        t += $spacing;
        goto $x1 + t*($x2-$x1)/len, $y1 + t*($y2-$y1)/len;
        pen_up;
        t += $spacing; # t is not normalised
    }
    goto $x1 + t*($x2-$x1)/len, $y1 + t*($y2-$y1)/len;
    pen_down;
    t += $spacing;
    if t > len {
        goto $x2, $y2;
    } else {
        goto $x1 + t*($x2-$x1)/len, $y1 + t*($y2-$y1)/len;
    }
    pen_up;
}

# Draw a dotted line segment
proc draw_line_dotted x1, y1, x2, y2, spacing {
    len = DIST($x1, $y1, $x2, $y2);
    steps = len/$spacing;
    t = 0;
    repeat ceil(len/$spacing) {
        goto $x1 + t*($x2-$x1)/len, $y1 + t*($y2-$y1)/len;
        pen_down;
        pen_up;
        t += $spacing; # t is not normalised
    }
}

# Draw a ray (line segment using an origin point and vector)
proc draw_ray x, y, vx, vy {
    goto $x, $y;
    pen_down;
    goto $x + $vx, $y + $vy;
    pen_up;
}

# Draw a broken ray
proc draw_ray_broken x, y, vx, vy, spacing {
    len = sqrt($vx*$vx + $vy*$vy);
    t = 0;
    repeat floor(len/(2*$spacing)) {
        goto $x + t*$vx/len, $y + t*$vy/len;
        pen_down;
        t += $spacing;
        goto $x + t*$vx/len, $y + t*$vy/len;
        pen_up;
        t += $spacing; # t is not normalised
    }
    goto $x + t*$vx/len, $y + t*$vy/len;
    pen_down;
    t += $spacing;
    if t > len {
        goto $x + $vx, $y + $vy;
    } else {
        goto $x + t*$vx/len, $y + t*$vy/len;
    }
    pen_up;
}

# Draw a dotted ray
proc draw_ray_dotted x, y, vx, vy, spacing {
    len = sqrt($vx*$vx + $vy*$vy);
    t = 0;
    repeat ceil(len/$spacing) {
        goto $x + t*$vx/len, $y + t*$vy/len;
        pen_down;
        pen_up;
        t += $spacing; # t is not normalised
    }
}

# Draw a rectangle from 2 corner points
proc draw_rectangle x1, y1, x2, y2 {
    goto $x1, $y1;
    pen_down;
    goto $x2, $y1;
    goto $x2, $y2;
    goto $x1, $y2;
    goto $x1, $y1;
    pen_up;
}

# Draw a rectangle from corner point, width and height
proc draw_rectangle_corner_wh x, y, width, height {
    goto $x, $y;
    pen_down;
    goto $x+$width, $y;
    goto $x+$width, $y+$height;
    goto $x, $y+$height;
    goto $x, $y;
    pen_up;
}

# Draw a circle
proc draw_circle x, y, radius, steps {
    angle = 90;
    goto $x, $y + $radius;
    pen_down;
    repeat $steps {
        angle += -360/$steps;
        goto $x + $radius * cos(angle), $y + $radius * sin(angle);
    }
    pen_up;
}

# Draw a broken circle
proc draw_circle_broken x, y, radius, spacing {
    steps = round(6.28318530718/($spacing/$radius));
    if steps > 1 {
        angle = 90;
        repeat steps {
            goto $x + $radius * cos(angle), $y + $radius * sin(angle);
            pen_down;
            angle += -180/steps;
            goto $x + $radius * cos(angle), $y + $radius * sin(angle);
            pen_up;
            angle += -180/steps;
        }
    }
}

# Draw a dotted circle
proc draw_circle_dotted x, y, radius, spacing {
    steps = round(6.28318530718/($spacing/$radius));
    if steps > 1 {
        angle = 90;
        repeat steps {
            goto $x + $radius * cos(angle), $y + $radius * sin(angle);
            pen_down;
            pen_up;
            angle += -360/steps;
        }
    }
}

# Draw an arc using angles from +x ccw
proc draw_arc x, y, radius, start_angle, stop_angle, steps {
    angle = $start_angle;
    goto $x + $radius * cos(angle), $y + $radius * sin(angle);
    pen_down;
    repeat $steps {
        angle += ($stop_angle-$start_angle)/$steps;
        goto $x + $radius * cos(angle), $y + $radius * sin(angle);
    }
    pen_up;
}

# draw a quadratic bezier curve from 3 points
proc draw_bezier_quadratic x1, y1, x2, y2, x3, y3, steps {
    goto $x1, $y1;
    pen_down;
    t = 0;
    repeat $steps-1 {
        t += 1/$steps;
        goto (1-t)*((1-t)*$x1 + t*$x2) + t*((1-t)*$x2 + (t*$x3)), (1-t)*((1-t)*$y1 + t*$y2) + t*((1-t)*$y2 + (t*$y3));
    }
    goto $x3, $y3; # this is here to guarantee the line reaches end regardless of step count
    pen_up;
}

# draw a cubic bezier curve from 4 points
proc draw_bezier_cubic x1, y1, x2, y2, x3, y3, x4, y4, steps {
    goto $x1, $y1;
    pen_down;
    t = 0;
    repeat $steps-1 {
        t += 1/$steps;
        goto (1-t)*((1-t)*((1-t) * $x1 + 3*t*$x2) + 3*$x3*t*t) + $x4*t*t*t, (1-t)*((1-t)*((1-t) * $y1 + 3*t*$y2) + 3*$y3*t*t) + $y4*t*t*t;
    }
    goto $x4, $y4; # this is here to guarantee the line reaches end regardless of step count
    pen_up;
}

# Draw a filled circle
proc draw_dot x, y {
    goto $x, $y;
    pen_down;
    pen_up;
}

# Draw an arrow using an origin point and vector
proc draw_arrow x, y, vx, vy {
    goto $x, $y;
    pen_down;
    goto $x + $vx, $y + $vy;

    # arrow head
    len = sqrt(($vx * $vx) + ($vy * $vy));
    if len > 0 { 
        goto ($x + $vx) - ((10*$vx) + (-2*$vy))/len, ($y + $vy) - ((10*$vy) + (2*$vx))/len;
        goto ($x + $vx) - ((10*$vx) + (2*$vy))/len, ($y + $vy) - ((10*$vy) + (-2*$vx))/len;
        goto $x + $vx, $y + $vy;
    }
    
    pen_up;
}

# Draw a number of evenly-spaced lines radiating from a single point.
proc draw_asterisk x, y, radius, rays {
    angle = 90;
    repeat $rays {
        goto $x, $y;
        pen_down;
        goto $x + $radius * cos(angle), $y + $radius * sin(angle);
        pen_up;
        angle += -360/$rays;
    }
}


################################################################

onflag {
    hide;
    set_size 10000;
    set_pen_size 1;
    set_pen_color "#202020";
    erase_all;
    
    draw_line -100, 60, 0, 40;
    draw_line_broken -100, 50, 0, 30, 12;
    draw_line_dotted -100, 40, 0, 20, 12;
    
    draw_ray -100, 20, 100, -20;
    draw_ray_broken -100, 10, 100, -20, 12;
    draw_ray_dotted -100, 0, 100, -20, 12;

    draw_rectangle -200, -160, -180, -130;
    draw_rectangle_corner_wh -190, -150, 25, 35;

    draw_circle 140, -40, 50, 16;
    draw_circle_broken 140, -40, 60, 12;
    draw_circle_dotted 140, -40, 70, 12;

    draw_arc 140, -40, 90, 135, 90, 16;
    
    draw_bezier_quadratic 110, 110, 120, 10, 140, 150, 16;
    draw_bezier_cubic 100, 100, 130, 20, 110, 150, 70, 20, 16;

    draw_dot 150, 100;
    draw_arrow -100, -20, 100, -20;
    draw_asterisk 0, 160, 10, 8;

    #forever {
        #erase_all;
        #draw_arrow 0, 0, mouse_x(), mouse_y();
    #}
}
