# Mexican Night Theme - Ruby Sample
# This file showcases the theme's Ruby syntax highlighting

require 'json'
require 'net/http'

# Module definition with Rosa Mexicano highlighting
module MexicanNight
  # Constants in golden yellow
  VERSION = '1.0.0'
  BASE_URL = 'https://api.example.com'
  
  # Class definition
  class ThemeDemo
    # Class variable in magenta
    @@theme_count = 0
    
    # Instance variables in cyan
    attr_reader :name, :author
    attr_accessor :colors
    
    def initialize(name, author = "Fernando")
      @name = name          # Instance variable
      @author = author
      @colors = {
        primary: '#E4007C',   # Rosa Mexicano
        secondary: '#006341', # Verde Mexicano
        accent: '#FFD700'     # Golden yellow
      }
      @@theme_count += 1
    end
    
    # Method with special highlighting
    def display_info
      puts "Theme: #{@name}"  # String interpolation
      puts "Author: #{@author}"
      puts "Colors: #{@colors.inspect}"
    end
    
    # Symbol usage (green highlighting)
    def get_color(type)
      case type
      when :primary
        @colors[:primary]
      when :secondary
        @colors[:secondary]
      when :accent
        @colors[:accent]
      else
        '#FFFFFF'
      end
    end
    
    # Ruby regex (teal highlighting)
    def validate_hex(color)
      color =~ /^#[0-9A-Fa-f]{6}$/
    end
    
    # Block usage
    def process_colors(&block)
      @colors.each do |key, value|
        yield(key, value) if block_given?
      end
    end
    
    # Global variable (orange, bold)
    def log_global
      $GLOBAL_VAR ||= "Mexican Night"
      puts $GLOBAL_VAR
    end
    
    # Class method
    def self.theme_count
      @@theme_count
    end
    
    # Special methods
    private
    
    def secret_method
      # Private implementation
    end
    
    protected
    
    def protected_method
      # Protected implementation
    end
  end
  
  # Usage example
  theme = ThemeDemo.new("Mexican Night", "Fernando Ruiz")
  theme.display_info
  
  # Array and hash literals
  colors = ['#E4007C', '#006341', '#FFD700']
  palette = {
    rosa_mexicano: '#E4007C',
    verde_mexicano: '#006341',
    neon_yellow: '#FFD700'
  }
  
  # Lambda and proc
  color_validator = ->(color) { color.start_with?('#') }
  color_processor = Proc.new { |c| c.upcase }
  
  # Metaprogramming
  class String
    def mexicanize
      self.gsub(/pink/i, 'Rosa Mexicano')
          .gsub(/green/i, 'Verde Mexicano')
    end
  end
  
  # Exception handling
  begin
    raise StandardError, "Theme not found"
  rescue StandardError => e
    puts "Error: #{e.message}"
  ensure
    puts "Theme loaded successfully"
  end
end