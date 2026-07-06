// Supabase Initialization
const supabaseUrl = "https://nmfxosqarpneiurszssp.supabase.co";
const supabaseKey = "sb_publishable_9V4LJRezy6-Z9cKEzy_oyg_ARn7aq0N";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabaseClient);

const login=document.querySelector("#login");
login.addEventListener("click",async()=>{
    const email=document.querySelector("#email").value ;
    console.log(email);

    const password=document.querySelector("#password").value ;
    console.log(password);

    
    if (!email || !password) {
        alert("All fields are required!");
        return;
    }

    // Supabase Login with Password

const { data, error } = await supabaseClient.auth.signInWithPassword({
  email,
  password,
})

if (error) {
    alert(error.message)
} else {
    alert("Login Successful!");
    window.location.href="notes.html"
}

})

// Sign up button
const signup=document.querySelector("#signup");
signup.addEventListener("click",() => {
    window.location.href="index.html"
})