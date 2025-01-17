# For more info see: https://scratch.mit.edu/projects/114633511/

costumes "costumes/icon_io.svg" as "icon";

list CSKV_data;

# Get the value immediately after a CSKV key. Uses the CSKV_data list.
%define CSKV_get(key) CSKV_data[1 + (("!" & (key)) in CSKV_data)] 

proc unpack_CSKV str {
    # version allowing escape char \
    substring = "";
    delete CSKV_data;
    add "" to CSKV_data;
    i = 1;
    until i > length($str) {
        if $str[i] == "\\" {
            if $str[i+1] == "," or $str[i+1] == ":" or $str[i+1] == "\\" {
                substring &= $str[i+1];
                i += 1;
            } else {
                substring &= "\\";
            }
            
        } elif $str[i] == "," {
            add substring to CSKV_data;
            substring = "";
        } elif $str[i] == ":" {
            add "!" & substring to CSKV_data;
            substring = "";
        } else {
            substring &= $str[i];
        }
        i += 1;
    }
}

proc unpack_CSKV_basic str {
    # few features 
    substring = "";
    delete CSKV_data;
    add "" to CSKV_data;
    i = 1;
    repeat length($str) {
        if $str[i] == "," {
            add substring to CSKV_data;
            substring = "";
        } elif $str[i] == ":" {
            add "!" & substring to CSKV_data;
            substring = "";
        } else {
            substring &= $str[i];
        }
        i += 1;
    }
}

proc join_kv_pair key, value {
    # helper to serialise data into a CSKV string
    substring &= $key & ":" & $value & ",";
}


################################################################

onflag {
    hide;
    delete CSKV_data;
    substring = "";
    unpack_CSKV "account_info,user:awesome-llama,id:8832510,join_date:2015-03-31,scratchteam:false,recent_projects:3,The Mast,Submersible,Road Network Designer,";
    say CSKV_get("user");
}

onkey "space" {
    ask "paste CSKV";
    if answer() != "" {
        unpack_CSKV answer();
    }
}

