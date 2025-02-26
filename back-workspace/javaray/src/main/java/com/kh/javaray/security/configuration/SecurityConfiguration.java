package com.kh.javaray.security.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.kh.javaray.auth.util.JwtFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

	private final JwtFilter jwtFilter;

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

		return httpSecurity.formLogin(AbstractHttpConfigurer::disable).httpBasic(AbstractHttpConfigurer::disable)
				.csrf(AbstractHttpConfigurer::disable).cors(Customizer.withDefaults())
				.authorizeHttpRequests(requests -> {
					requests.requestMatchers("/members", "/members/login", "/uploads/**", "/funding").permitAll();
					requests.requestMatchers(HttpMethod.PUT, "/members/update/**", "/shippings").authenticated();
					requests.requestMatchers(HttpMethod.DELETE, "/members", "/shippings/attention").authenticated();
					requests.requestMatchers(HttpMethod.POST, "/members/refresh", "/businessNo/**",
							"/shippings/attention", "/goods/**", "/shippings").authenticated();
					requests.requestMatchers(HttpMethod.GET, "/shippings/**", "/shippings/detail/**",
							"/funding/selectList/**", "/funding/selectCategory", "uploads/**", "/uploads/images/**",
							"/businessNo", "/main/**").permitAll();
					requests.requestMatchers(HttpMethod.GET, "/fishing", "/fishing/detail/**", "/fishing/review")
							.permitAll();
					requests.requestMatchers(HttpMethod.POST, "/fishing/review/insert", "/fishing/insert",
							"/fishing/insertList").authenticated();
					requests.requestMatchers(HttpMethod.GET, "/members/users", "/shippings/attention").authenticated();
					requests.requestMatchers("/manager/**").hasRole("ADMIN");

				})
				.sessionManagement(
						sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

}
