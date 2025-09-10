// Supabase Initialization
const supabaseUrl = "https://mktfagwltkjjqteovbjb.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdGZhZ3dsdGtqanF0ZW92YmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNDg0MjAsImV4cCI6MjA3MTYyNDQyMH0.BOaG8nCpzYpZAojZKGWkN1zc4Q4cU1zfcnEpzGVGlko";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabase);

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
const { data, error } = await supabase.auth.signUp({
  email,
  password,
   options: {
    emailRedirectTo: "http://127.0.0.1:5500/login.html"
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
window.location.href="login.html";
})

