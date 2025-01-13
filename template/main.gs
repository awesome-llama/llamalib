costumes "costumes/icon_main.svg" as "icon";

%include std/math

# More info on the project structure: https://scratch.mit.edu/projects/749493736/

onflag {
    hide;
    switch_costume "icon";
    dev = 0;
    if username() == "awesome-llama" or username() == "awesome-llama-test" {
        dev = 1;
    }
    broadcast "reset shared vars";
    broadcast "! initalise";
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


onkey "up arrow" {
    # zoom in
    cam_scale *= 2;
    if cam_scale > 16 {cam_scale = 16;}
}

onkey "down arrow" {
    # zoom out
    cam_scale /= 2;
    if cam_scale < 0.015625 {cam_scale = 0.015625;}
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