<script>
    import { get, post, del } from "../util"; 
    import { onMount } from "svelte";
    import { token } from "../state";
    import { loggedId } from "../state";
    import Input from "../Input.svelte"
    
    import validate from "validate.js";
    import Inhome from "./Inhome.svelte"

    var fields = [
        {type: "email", id: "email", placeholder: "Email", bound: "email"},
        {type: "password", id: "password", placeholder: "Password", bound: "password"},
    ]
    

    // Hook up the form so we can prevent it from being posted
    let form = {};
    let errors = {};
    let isUser;
    let message = "";
   

    onMount(() => (form = document.querySelector("form#main")));

    function error(map, name) {
        if (!map) return "";
        if (name in map) {
            //document.getElementById(name).classList.add("text-red")
            let label = document.querySelector("label[for='" + name + "']");
            if (label) label.classList.add("text-red-500");

            return map[name].join("<br>");
        } else {
            let label = document.querySelector("label[for='" + name + "']");
            if (label) label.classList.remove("text-red-500");
            //document.getElementById(name).classList.remove("text-red")
        }
        return "";
    }


    var constraints = {
        email: {

            // Email is required
            presence: true,

            // and must be an email (duh)
            valid: true,
        },
        password: {

            // Password is also required
            presence: true,

            // And must be at least 5 characters long
            length: {
                checkMinimum: true,
                minimum: 5
            }
        },
    };

    
    async function submit() {

        // Loop over every field and check if it has an error
        // TODO: Improve this
        for(let i = 0; i < fields.length; i++){
            let field = fields[i];
            let input = document.getElementById(field.id);
            let error = document.getElementById(field.id + "_error")
            if(field.type == 'email') {
                if((constraints.email.valid && input.validity.typeMismatch)
                    || (constraints.email.presence && input.value.length == 0)) {
                    input.classList.add("ring-red-500");
                    error.classList.remove('h-0')
                    error.classList.add('h-auto')
                    error.innerHTML = input.value.length == 0 ? "Required" : "Invalid"
                } else {
                    input.classList.remove("ring-red-500");
                    error.classList.add('h-0')
                    error.classList.remove('h-auto')
                }
            }
            if(field.type == 'password') {
                // This is a very long if statement, but it's the only way I could think of to check if the password is valid
                if((input.value.length < (constraints.password.length.checkMinimum
                        ? constraints.password.length.minimum : -1))
                    || (constraints.password.presence && input.value.length == 0)) {
                    input.classList.add("ring-red-500");
                    error.classList.remove('h-0')
                    error.classList.add('h-auto')
                    error.innerHTML = input.value.length == 0 ? "Required" : "Invalid"
                } else {
                    input.classList.remove("ring-red-500");
                    error.classList.add('h-0')
                    error.classList.remove('h-auto')
                }
            }
        }

        // validate the form against the constraints
        errors = validate(form, constraints);
        if (!errors) {
            //alert("success");
            isUser = await post("/login", data);
            if ("error" in isUser) message = isUser.error;
            else {
                token.set(isUser.token);
                loggedId.set(isUser.loggedId)
                             
            }
        }
    }

    // Clear the login token and the currently logged in user
    function logout() {
        token.set("")
        loggedId.set("")
    }

    // Default data
    let data = {
        "username": "info@sciabarra.com",
        "password": "openmed"
    };


    import { loggedUser } from "../state";

</script>

<!--Removed the code, it is now in HomeOld.html, you may remove the file if you want-->

{#if $token == ""}
<div class="shadow-2xl rounded bg-gray-100 grid place-items-center" style="margin-left: 30vw; margin-top: 25vh; width: 40vw; height: 50vh;">
    <div class="flex justify-center">
      <div class="text-gray-900 placeholder-gray-400 absolute w-56">
          {#each fields as {type, id, placeholder, bound}}
            <Input {type} {id} {placeholder} bind:value={data[bound]}/>
          {/each}
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <button class="w-32 sm:w-64 text-base font-medium rounded-3xl p-3 bg-sky-500 text-white flex justify-center" id="confirm" on:click|preventDefault={submit}>Confirm</button>
    </div>
  </div>
{:else}
  <Inhome />
{/if}