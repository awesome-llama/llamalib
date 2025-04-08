# More info on the project structure: https://scratch.mit.edu/projects/749493736/

%include common/common.gs

costumes "costumes/icon_main.svg" as "icon";
hide;


on "initalise" {
    hide;
    switch_costume "icon";
    dev = 0;
    if username() == "awesome-llama" or username() == "awesome-llama-test" {
        dev = 1;
    }
}

on "start main loop" {
    last_time = days_since_2000();
    forever {
        # delta time
        dt = 86400 * (days_since_2000() - last_time);
        if dt > 0.1 {dt = 0.1;}
        FPS = round(1/dt);
        last_time = days_since_2000();

        # tick
        erase_all;
        broadcast "get inputs";
        broadcast "render";
    }
}

on "get inputs" {
    cam_x += 200 * (dt/cam_scale) * (key_pressed("d") - key_pressed("a"));
    cam_y += 200 * (dt/cam_scale) * (key_pressed("w") - key_pressed("s"));
}


onkey "up arrow" { broadcast "zoom in"; }
on "zoom in" {
    change_zoom 1;
}


onkey "down arrow" { broadcast "zoom out"; }
on "zoom out" {
    change_zoom -1;
}


# 2^(1/increment)
%define ZOOM_INCREMENT sqrt(2)
proc change_zoom increment {
    cam_scale = POW(ZOOM_INCREMENT, round(LOG(cam_scale, ZOOM_INCREMENT) + $increment));
    
    # limits
    if (cam_scale < 0.125) {
        cam_scale = 0.125;
    } elif (cam_scale > 32) {
        cam_scale = 32;
    }
}


on "stage clicked" {
    mouse_last_x = mouse_x();
    mouse_last_y = mouse_y();
    until not mouse_down() {
        cam_x += (mouse_last_x - mouse_x()) / cam_scale;
        cam_y += (mouse_last_y - mouse_y()) / cam_scale;
        mouse_last_x = mouse_x();
        mouse_last_y = mouse_x();
    }
}