const ProfileCard = () => {
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");
  
    function nameFromEmail(email) {
      if (!email) return "User";
      const base = email.split("@")[0];
      const parts = base.split(/[._-]/);
      return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    }
  
    const displayName = storedName || nameFromEmail(storedEmail);
    const displayEmail = storedEmail || "No Email Found";
  
    return (
      <div className="profile-card">
        <h3 className="profile-card-title">Your Profile</h3>
        <div className="profile-card-body">
          <p><strong>Name:</strong> {displayName}</p>
          <p><strong>Email:</strong> {displayEmail}</p>
        </div>
      </div>
    );
  };
  