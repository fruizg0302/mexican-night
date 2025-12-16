# Enhanced Ruby Test for Mexican Night Theme
# Focus on testing 'end' keywords and control structures

class TestClass
  def initialize
    @instance_var = "test"
    @@class_var = "shared"
  end

  def test_method
    if true
      puts "Inside if block"
    end  # This 'end' should be highlighted properly
    
    case @instance_var
    when "test"
      puts "Found test"
    else
      puts "Something else"
    end  # This 'end' should be highlighted properly
    
    begin
      risky_operation
    rescue StandardError => e
      puts "Error: #{e.message}"
    ensure
      puts "Cleanup"
    end  # This 'end' should be highlighted properly
  end
  
  def loop_examples
    while true
      break if condition
    end  # This 'end' should be highlighted properly
    
    for i in 1..10
      next if i.even?
      puts i
    end  # This 'end' should be highlighted properly
  end
  
  private
  
  def private_method
    # Private implementation
  end  # This 'end' should be highlighted properly
end  # This 'end' should be highlighted properly

# Module with 'end' keyword
module TestModule
  def self.test
    puts "Module method"
  end  # This 'end' should be highlighted properly
end  # This 'end' should be highlighted properly 