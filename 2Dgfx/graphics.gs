# various graphics utils
%include std/math

costumes "costumes/icon.svg";

proc draw_line x1, y1, x2, y2 {
    # Draw a line segment using 2 points
    goto $x1, $y1;
    pen_down;
    goto $x2, $y2;
    pen_up;
} 

proc draw_ray x, y, vx, vy {
    # Draw a line segment using an origin point and vector
    goto $x, $y;
    pen_down;
    goto $x + $vx, $y + $vy;
    pen_up;
} 

proc draw_circle x, y, radius, steps {
    # Draw a circle
    angle = 0;
    goto $radius, 0;
    pen_down;
    repeat $steps {
        angle += 360/$steps;
        goto $radius * cos(angle), $radius * sin(angle);
    }
    pen_up;
} 

proc draw_dot x, y, diameter {
    # Draw a filled circle
    set_pen_size $diameter;
    goto $x, $y;
    pen_down;
    pen_up;
} 

proc draw_arrow x, y, vx, vy {
    # Draw an arrow using an origin point and vector
    goto $x, $y;
    pen_down;
    goto $x + $vx, $y + $vy;

    len = sqrt(($vx * $vx) + ($vy * $vy));
    if len > 0 {
        goto ($x + $vx) - ((10*$vx) + (-2*$vy))/len, ($y + $vy) - ((10*$vy) + (2*$vx))/len;
        goto ($x + $vx) - ((10*$vx) + (2*$vy))/len, ($y + $vy) - ((10*$vy) + (-2*$vx))/len;
        goto $x + $vx, $y + $vy;
    }
    
    pen_up;
}


################################################################

onflag {
    hide;
    set_size 10000;
    set_pen_size 1;
    set_pen_color "#202020";
    forever {
        erase_all;
        #draw_line 20, 8, 40, 25;
        #draw_ray 3 ,3 , 0, 10;
        #draw_circle 0, 0, 100, 12;
        draw_arrow 0, 0, mouse_x(), mouse_y();
    }
}
