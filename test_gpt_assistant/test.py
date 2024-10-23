import unittest

# Set a maximum username length (Ensure only one value is active at a time for testing—either the pass or fail case)
MAX_USERNAME_LENGTH = 40  # This will pass the test

# MAX_USERNAME_LENGTH = 41  # Uncomment this to trigger a test failure

# Username validation function
def validate_username(username):
    # Check if username is a string, has a length greater than 2 and less than or equal to MAX_USERNAME_LENGTH, and does not contain "@"
    return isinstance(username, str) and 2 < len(username) <= MAX_USERNAME_LENGTH and "@" not in username

# Unit Test Class
class TestUsernameValidation(unittest.TestCase):
    
    # Test valid username case
    def test_valid_username(self):
        self.assertTrue(validate_username("validUser"))  # Should pass
    
    # Test empty username case
    def test_empty_username(self):
        self.assertFalse(validate_username(""))  # Should fail
    
    # Test short username case (too short, less than 3 characters)
    def test_too_short_username(self):
        self.assertFalse(validate_username("ab"))  # Should fail

    # Test username with an invalid symbol (@)
    def test_invalid_symbol_in_username(self):
        self.assertFalse(validate_username("a@b"))  # Should fail
    
    # Test maximum valid length case (boundary case)
    def test_max_length_username(self):
        long_username = "a" * MAX_USERNAME_LENGTH  # exactly 40 characters
        self.assertTrue(validate_username(long_username))  # Should pass
    
    # Test username exceeding max length (edge case)
    def test_exceeding_max_length_username(self):
        long_username = "a" * (MAX_USERNAME_LENGTH + 1)  # 41 characters
        self.assertFalse(validate_username(long_username))  # Should fail

    # Test username exactly at minimum valid length (boundary case)
    def test_min_valid_length_username(self):
        self.assertTrue(validate_username("abc"))  # Should pass

if __name__ == '__main__':
    unittest.main()