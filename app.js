// Supabase Initialization
const supabaseUrl = "https://nmfxosqarpneiurszssp.supabase.co";
const supabaseKey = "sb_publishable_9V4LJRezy6-Z9cKEzy_oyg_ARn7aq0N";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabaseClient);

const signupBtn=document.querySelector("#signup");
signupBtn.addEventListener("click",async()=>{
const email=document.querySelector("#email").value ;
console.log(email);

const password=document.querySelector("#password").value ;
console.log(password);

const confirmPassword=document.querySelector("#confirmPassword").value ;
console.log(confirmPassword);

if (!email || !password || !confirmPassword) {
    alert("All fields are required!");
}

if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
}

// Supabase Signup
const { data, error } = await supabaseClient.auth.signUp({
  email,
  password,
   options: {
    emailRedirectTo: "http://127.0.0.1:5501/notes-login.html"
  }
})

if (error) {
    alert(error.message)
} else {
    alert("Account created! Please check your email to confirm.");
}

})

// Already Account
const alreadyAccount=document.querySelector("#alreadyAccount");
alreadyAccount.addEventListener("click",()=>{
window.location.href="notes-login.html";
})

